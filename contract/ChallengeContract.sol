// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ChallengeContract {
    address public owner;
    bool internal locked;
    uint256 public smartContractBalance;
    Challenge[] public listOfChallenges;

    struct Challenge {
        address challengeCreatorAddress;
        uint32 challengeId;
        uint256 amountToBeStaked;
        uint256 expiryDate;
        uint256 target;
        uint8 totalAcceptedUsers;
        uint8 totalWinners;
        bool isPublicChallenge;
        bool isActive;
    }
    mapping(uint32 => Challenge) public challenges;
    mapping(address => mapping(uint32 => uint256)) public winnerAmount;
    mapping(uint32 => bool) public fundDisbursed;
    mapping(address => uint[]) public userChallenges;
    mapping(uint32 => address[]) public listOfUsersInChallenge;
    mapping(uint32 => address[]) public winnerList;

    event ChallengeCreated(
        uint32 challengeId,
        uint256 amountToBeStaked,
        uint256 expiryDate,
        bool isPublicChallenge
    );
    event DeleteChallenge(uint32 challengeId);
    event UserAddedToChallenge(uint32 challengeId, address user);
    event WinnerAdded(uint challengeId, address winner);

    constructor() {
        owner = msg.sender;
    }

    function createChallenge(
        uint32 _challengeId,
        uint256 _expiryDate,
        uint256 _betAmount,
        uint256 _target,
        bool _isPublicChallenge
    ) public payable {
        require(
            challenges[_challengeId].challengeId != _challengeId,
            "Challenge is already created"
        );
        require(
            _expiryDate > block.timestamp,
            "Expiry Date is already finished"
        );
        require(_betAmount == msg.value);
        if (_isPublicChallenge) {
            require(
                msg.sender == owner,
                "You are not the owner to create this challenge"
            );
        }
        challenges[_challengeId] = Challenge({
            challengeCreatorAddress: msg.sender,
            challengeId: _challengeId,
            amountToBeStaked: _betAmount,
            expiryDate: _expiryDate,
            target: _target,
            totalAcceptedUsers: 1,
            totalWinners: 0,
            isPublicChallenge: _isPublicChallenge,
            isActive: true
        });
        listOfChallenges.push(challenges[_challengeId]);
        listOfUsersInChallenge[_challengeId].push(msg.sender);
        userChallenges[msg.sender].push(_challengeId);
        emit ChallengeCreated(
            _challengeId,
            _betAmount,
            _expiryDate,
            _isPublicChallenge
        );
    }

    function addUserToChallenge(uint32 _challengeId) external payable {
        require(challenges[_challengeId].isActive, "Challenge is expired");
        require(
            msg.value == challenges[_challengeId].amountToBeStaked,
            "Send the correct amount for challenge"
        );

        if (!challenges[_challengeId].isPublicChallenge) {
            require(
                challenges[_challengeId].totalAcceptedUsers == 2,
                "Challenge is full"
            );
        }
        challenges[_challengeId].totalAcceptedUsers++;
        listOfUsersInChallenge[_challengeId].push(msg.sender);
        userChallenges[msg.sender].push(_challengeId);

        emit UserAddedToChallenge(_challengeId, msg.sender);
    }

    function calculateReward(uint32 _challengeId) public {
        require(challenges[_challengeId].isActive, "Challenge is finished");
        require(
            challenges[_challengeId].expiryDate > block.timestamp,
            "Challenge is not finished yet"
        );

        if (winnerList[_challengeId].length == 0) {
            smartContractBalance =
                smartContractBalance +
                (challenges[_challengeId].amountToBeStaked *
                    challenges[_challengeId].totalAcceptedUsers);
            challenges[_challengeId].isActive = false;
            challenges[_challengeId].totalWinners = uint8(
                winnerList[_challengeId].length
            );
            return;
        }

        if (challenges[_challengeId].isPublicChallenge) {
            for (uint8 i = 0; i < winnerList[_challengeId].length; i++) {
                winnerAmount[winnerList[_challengeId][i]][_challengeId] =
                    smartContractBalance /
                    winnerList[_challengeId].length;
            }
            smartContractBalance = 0;
            challenges[_challengeId].isActive = false;
            challenges[_challengeId].totalWinners = uint8(
                winnerList[_challengeId].length
            );
            return;
        }

        for (uint8 i = 0; i < winnerList[_challengeId].length; i++) {
            winnerAmount[winnerList[_challengeId][i]][_challengeId] =
                (challenges[_challengeId].totalAcceptedUsers *
                    challenges[_challengeId].amountToBeStaked) /
                winnerList[_challengeId].length;
        }
        challenges[_challengeId].isActive = false;
        challenges[_challengeId].totalWinners = uint8(
            winnerList[_challengeId].length
        );
    }

    function addWinners(
        uint32 _challengeId,
        address _winner
    ) external onlyOwner {
        require(msg.sender == owner, "Only the owner can call this function");
        require(
            !fundDisbursed[_challengeId],
            "Challenge is over and fund disbursed already"
        );
        require(
            winnerList[_challengeId].length <=
                challenges[_challengeId].totalAcceptedUsers
        );
        require(
            challenges[_challengeId].isActive,
            "Challenge is finished and winners are declared"
        );
        winnerList[_challengeId].push(_winner);
        if (
            challenges[_challengeId].expiryDate > block.timestamp &&
            winnerList[_challengeId].length == 2
        ) {
            for (uint8 i = 0; i < winnerList[_challengeId].length; i++) {
                winnerAmount[winnerList[_challengeId][i]][_challengeId] =
                    (challenges[_challengeId].totalAcceptedUsers *
                        challenges[_challengeId].amountToBeStaked) /
                    winnerList[_challengeId].length;
            }
            challenges[_challengeId].isActive = false;
            challenges[_challengeId].totalWinners = 2;
            return;
        }

        emit WinnerAdded(_challengeId, _winner);
    }

    function listOfAcceptedUsers(
        uint32 _challengeId
    ) public view returns (address[] memory) {
        address[] memory AcceptedUsers = new address[](
            listOfUsersInChallenge[_challengeId].length
        );
        for (
            uint8 i = 0;
            i < listOfUsersInChallenge[_challengeId].length;
            i++
        ) {
            AcceptedUsers[i] = (listOfUsersInChallenge[_challengeId][i]);
        }
        return AcceptedUsers;
    }

    function claimReward(uint32 _challengeId) external payable noReentrancy {
        require(
            challenges[_challengeId].expiryDate < block.timestamp,
            "Challenge time is not finished yet"
        );

        require(!challenges[_challengeId].isActive, "Winners not added yet");

        require(
            !fundDisbursed[_challengeId],
            "Funds for this challenge is already disbursed"
        );
        require(
            winnerAmount[msg.sender][_challengeId] > 0,
            "You are not the winner of the challenge"
        );

        (bool success, ) = msg.sender.call{
            value: winnerAmount[msg.sender][_challengeId]
        }("");
        require(success, "Transfer failed");
        winnerAmount[msg.sender][_challengeId] = 0;
        challenges[_challengeId].totalWinners -= 1;
        if (challenges[_challengeId].totalWinners == 0) {
            fundDisbursed[_challengeId] = true;
        }
    }

    function deleteChallenge(uint32 _challengeId) public payable noReentrancy {
        require(
            msg.sender == challenges[_challengeId].challengeCreatorAddress,
            "You are not the creator of this challenge"
        );
        require(
            challenges[_challengeId].totalAcceptedUsers == 1,
            "People already joined the challenge"
        );
        require(
            challenges[_challengeId].expiryDate > block.timestamp,
            "Challenge is already expired"
        );

        (bool success, ) = msg.sender.call{
            value: challenges[_challengeId].amountToBeStaked
        }("");
        require(success, "Transfer failed");

        challenges[_challengeId].isActive = false;
        fundDisbursed[_challengeId] = true;

        emit DeleteChallenge(_challengeId);
    }

    function fetchUserChallenges(
        address userAddress
    ) public view returns (uint[] memory) {
        uint[] memory senderArray = new uint[](
            userChallenges[userAddress].length
        );
        for (uint i = 0; i < userChallenges[userAddress].length; i++) {
            senderArray[i] = userChallenges[userAddress][i];
        }
        return senderArray;
    }

    function getAllChallenges() public view returns (Challenge[] memory) {
        Challenge[] memory senderArray = new Challenge[](
            listOfChallenges.length
        );
        for (uint i = 0; i < listOfChallenges.length; i++) {
            senderArray[i] = listOfChallenges[i];
        }
        return senderArray;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier noReentrancy() {
        require(!locked, "Reentrant call detected");
        locked = true;
        _;
        locked = false;
    }
}
