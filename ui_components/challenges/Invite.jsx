import { useCallback, useEffect, useState } from "react";
import { BackBtn, InputField } from "../shared";

import { SearchResult } from ".";
import { debounce } from "lodash";
import { getSearchResult } from "@/utils/apiservices";
import { ICONS } from "@/utils/images";
import { CHALLENGE_COMP } from "@/pages/create-challenge";
import Image from "next/image";
import { useCopyToClipboard } from "@/utils/hooks/useCopyToClipboard";
import Spinner from "../shared/Spinner";

// https://api.web3.bio/profile/

const Invite = ({ handleUpdateStep, challengeId }) => {
    const [, copy] = useCopyToClipboard();
    const [inputValue, setInputValue] = useState("");
    const [loader, setLoader] = useState(false);
    const [searchResult, setSearchResult] = useState();
    const [baseUrl, setBaseUrl] = useState();

    useEffect(() => {
        let base_url = window.location.origin;
        setBaseUrl(`${base_url}/challenge-join/${challengeId}`);
    }, [challengeId]);

    const handleSearchValue = (val) => {
        if (val) {
            setLoader(true);
            getSearchResult(val).then((res) => {
                console.log(res, "res");
                if (res?.data) {
                    setSearchResult(res.data);
                    setLoader(false);
                }
            });
        }
    };

    const debounceInput = useCallback(debounce(handleSearchValue, 800), []);

    const handleChangeInput = (e) => {
        setInputValue(e);
    };
    const handleClearInput = () => {
        setInputValue("");
    };

    useEffect(() => {
        debounceInput(inputValue);
        if (!inputValue) {
            setSearchResult([]);
        }
    }, [inputValue]);

    return (
        <section className="relative h-full">
            <div className="container mx-auto h-full">
                <div className="h-full w-full">
                    <div className="pt-4">
                        <BackBtn
                            className="mb-2"
                            onClick={() =>
                                handleUpdateStep(CHALLENGE_COMP.stakeAndCreateChallenge)
                            }
                        />
                        <h2 className="heading2_bold mb-4">
                            Who do you want to <br /> challenge?
                        </h2>
                        <p className="paragraph_regular mb-[70px]">
                            * If you fail to complete the challenge this amount will be
                            deducted from your balance
                        </p>
                        <div className="pb-4">
                            <div className="heading2_bold ">Share URL</div>
                            <a href={`${baseUrl}`}>{baseUrl}</a>
                            <Image
                                src={ICONS.copyGray}
                                alt="copy gray"
                                onClick={() => copy(baseUrl)}
                                className="inline cursor-pointer ml-2"
                            />
                        </div>
                    </div>
                    <div className="heading2_bold p-4 text-center">Or</div>
                    <div className="heading2_bold mb-2">Invite</div>
                    <InputField
                        placeholder="NextID/Address/ENS/Lens"
                        isSearch
                        searchIcon={ICONS.SearchIcon}
                        onChange={(e) => handleChangeInput(e.target.value)}
                        value={inputValue}
                        OnClear={handleClearInput}
                    />
                    <p className="supportText_regular text-grey p-2">
                        API powered by web3 bio of Mask Network{" "}
                    </p>
                    {loader && (
                        <div className="p-4 flex items-center">
                            <Spinner />
                        </div>
                    )}
                    {searchResult && searchResult.length > 0 && !loader && (
                        <div>
                            <p className="paragraph_regular mb-2 mt-6">
                                {`Found ${searchResult.length} matching result from users web3 bio`}
                            </p>
                            {searchResult.map((item, ind) => {
                                return (
                                    <SearchResult
                                        handleUpdateStep={handleUpdateStep}
                                        baseUrl={baseUrl}
                                        {...item}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Invite;
