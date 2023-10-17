import { useMemo, useState } from "react";
import { BackBtn, Button, InputField, SlidingTab } from "../shared";
import { challengeTabs } from "@/constants/index.js";
import { ICONS } from "@/utils/images";
import Image from "next/image";

const NewChallenge = ({ handleUpdateStep, handleUpdateForm }) => {
    const [activeTab, setActiveTab] = useState("steps");

    const handleTabClick = (id) => {
        setActiveTab(id);
        setStepsValue("");
        setError("");
    };

    const [stepsValue, setStepsValue] = useState("");
    const [duration, setDuration] = useState(0);
    const [error, setError] = useState("");

    const buttonDisabled = useMemo(() => {
        return !duration || !stepsValue;
    }, [duration, stepsValue]);

    const handleInputChange = (val) => {
        if (/^\d*\.?\d*$/.test(val) || val === "") {
            const numericValue = parseFloat(val);
            if (!isNaN(numericValue)) {
                if (numericValue <= 100000) {
                    setStepsValue(val);
                    setError("");
                } else {
                    setError("Value cannot exceed 100,000");
                }
            } else {
                setStepsValue("");
            }
        } else {
            setError("Please enter a valid number");
        }
    };

    const updateStep = () => {
        handleUpdateForm({
            steps: stepsValue,
            duration,
        });
        handleUpdateStep("createChallenge");
    };

    return (
        <section className="relative h-full">
            <div className="container mx-auto h-full relative">
                <div className="h-full w-full pb-[100px]">
                    <div className="pt-4">
                        <BackBtn className="mb-2" />
                        <h2 className="heading2_bold mb-5">
                            What do you want to <br /> Achieve?
                        </h2>
                        <div className="bg-green rounded-4xl p-5 relative overflow-clip mb-10">
                            <div className="flex items-end justify-between relative z-10">
                                <div className="flex items-center gap-2">
                                    <Image className="w-[70px]" src={ICONS.walkIcon} />
                                    <div>
                                        <p className="paragraph_regular text-grey5 mb-1">
                                            {activeTab === "steps" ? "Steps" : "Distance"}
                                        </p>
                                        <p className="heading2_extrabold text-grey4">
                                            {stepsValue ? stepsValue : 0}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-right paragraph_regular text-grey5">
                                    in <br /> 1 days
                                </p>
                            </div>
                            <Image
                                className="w-full absolute left-0 top-0 z-0"
                                src={ICONS.StepsPattern}
                            />
                        </div>
                        <div className="mb-6">
                            <SlidingTab
                                tabData={challengeTabs}
                                handleTabClick={handleTabClick}
                                activeTab={activeTab}
                            />
                        </div>
                        <div>
                            {activeTab === "steps" ? (
                                <div>
                                    <InputField
                                        inputMode="decimal"
                                        type="number"
                                        className={` ${
                                            error ? "mb-[10px]" : "mb-[30px]"
                                        }`}
                                        label={"Goal"}
                                        rightText="Steps"
                                        value={stepsValue}
                                        onChange={(e) => {
                                            handleInputChange(e.target.value);
                                        }}
                                        showClose={false}
                                        step={100}
                                    />
                                    {error && (
                                        <p className="text-red-500 mb-[30px]">{error}</p>
                                    )}
                                    <div>
                                        <InputField
                                            value={duration}
                                            type="number"
                                            label={"Duration"}
                                            rightText="Days"
                                            showClose={false}
                                            onChange={(e) => {
                                                setDuration(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                            ) : null}
                            {activeTab === "distance" ? (
                                <div>
                                    <InputField
                                        inputMode="decimal"
                                        type="text"
                                        className={` ${
                                            error ? "mb-[10px]" : "mb-[30px]"
                                        }`}
                                        label={"Goal"}
                                        rightText="Distance"
                                        value={stepsValue}
                                        showClose={false}
                                        onChange={(e) => {
                                            handleInputChange(e.target.value);
                                        }}
                                    />
                                    {error && (
                                        <p className="text-red-500 mb-[30px]">{error}</p>
                                    )}
                                    <div className="disabled">
                                        <InputField
                                            value={1}
                                            label={"Duration"}
                                            rightText="Days"
                                            showClose={false}
                                        />
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`fixed bottom-12 w-[380px] left-1/2 -translate-x-1/2 z-10 ${
                    buttonDisabled ? "disabled" : ""
                }`}
            >
                <Button
                    variant={"primary"}
                    onClick={() => updateStep()}
                    className="w-full"
                    disabled={buttonDisabled}
                >
                    <div className="flex items-center justify-center gap-2">
                        Set goal
                        <Image src={ICONS.arrowRightWhite} />
                    </div>
                </Button>
            </div>
        </section>
    );
};

export default NewChallenge;
