import { useCallback, useEffect, useState } from "react";
import { BackBtn, InputField } from "../shared";

import { SearchResult } from ".";
import { debounce } from "lodash";
import { getSearchResult } from "@/utils/apiservices";

const Invite = ({ handleUpdateStep }) => {
    const [inputValue, setInputValue] = useState("");
    const [loader, setLoader] = useState(false);
    const [searchResult, setSearchResult] = useState();

    const handleSearchValue = (val) => {
        setLoader(true);
        getSearchResult(val).then((res) => {
            setSearchResult(res.data.data.items);
            setLoader(false);
        });
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
    }, [inputValue]);

    return (
        <section className="relative h-full">
            <div className="container mx-auto h-full">
                <div className="h-full w-full">
                    <div className="pt-4">
                        <BackBtn className="mb-2" />
                        <h2 className="heading2_bold mb-4">
                            Who do you want to <br /> challenge?
                        </h2>
                        <p className="paragraph_regular mb-[70px]">
                            * If you fail to complete the challenge this amount will be
                            deducted from your balance
                        </p>
                    </div>
                    <InputField
                        placeholder="Search your friend"
                        isSearch
                        searchIcon={ICONS.searchIcon}
                        onChange={(e) => handleChangeInput(e.target.value)}
                        value={inputValue}
                        OnClear={handleClearInput}
                    />

                    {searchResult && searchResult.length > 0 && !loader && (
                        <div>
                            <p className="paragraph_regular mb-2 mt-6">
                                {`Found ${searchResult.length} matching result`}
                            </p>
                            {searchResult.map((item, ind) => {
                                return (
                                    <SearchResult
                                        handleUpdateStep={handleUpdateStep}
                                        name={inputValue}
                                        address={item.address}
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
