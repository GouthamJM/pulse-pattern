import { ICONS } from "@/utils/images";
import { LastSynced } from ".";
import Image from "next/image";

const UserChallengeDetail = ({showDetail, handleShowDetail}) => {
    return (
        <div className="container mx-auto h-auto relative">
            <div className={`cursor-pointer`} onClick={() => {
                        handleShowDetail();
                    }}>
                <Image src={ICONS.arrowBack} />
            </div>

            <div className="flex justify-center items-center my-4">
                <Image className="w-full" src={ICONS.mapDummy} />
            </div>
            <LastSynced />

            <p className="paragraph_regular font-bold text-black mt-9">You have completed</p>

            <p className="text-[36px] font-extrabold leading-[42px] text-black">3,278 steps</p>

            <p className="paragraph_regular font-bold text-black mt-9">In past</p>

            <p className="text-[36px] font-extrabold leading-[42px] text-black">16 hours</p>
        </div>
    );
};

export default UserChallengeDetail;
