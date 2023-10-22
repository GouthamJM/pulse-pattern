import { useMemo, useState } from "react";
import { BackBtn, Button, InputField, SlidingTab } from "../shared";
import { challengeTabs } from "@/constants/index.js";
import { ICONS } from "@/utils/images";
import Image from "next/image";
import { CHALLENGE_COMP } from "@/pages/create-challenge";

const ChallengeStepForm = ({ handleUpdateStep, handleUpdateForm, challengeForm }) => {
    const [activeTab, setActiveTab] = useState("steps");

    const handleTabClick = (id) => {
        setActiveTab(id);
        setError("");
    };

    const [error, setError] = useState("");

    const buttonDisabled = useMemo(() => {
        return !challengeForm.duration || !challengeForm.steps;
    }, [challengeForm]);

    const handleInputChange = (val) => {
        if (/^\d*\.?\d*$/.test(val) || val === "") {
            const numericValue = parseFloat(val);
            if (!isNaN(numericValue)) {
                if (numericValue <= 100000) {
                    handleUpdateForm({
                        steps: numericValue,
                    });
                    setError("");
                } else {
                    setError("Value cannot exceed 100,000");
                }
            } else {
                handleUpdateForm({
                    steps: "",
                });
            }
        } else {
            setError("Please enter a valid number");
        }
    };

    const updateStep = () => {
        handleUpdateStep(CHALLENGE_COMP.stakeAndCreateChallenge);
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
                                            {challengeForm.steps
                                                ? challengeForm.steps
                                                : 0}
                                        </p>
                                    </div>
                                </div>
                                {/* <p className="text-right paragraph_regular text-grey5">
                                    in <br /> 1 days
                                </p> */}
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
                                        value={challengeForm.steps}
                                        onChange={(e) => {
                                            handleInputChange(e.target.value);
                                        }}
                                        showClose={false}
                                        step={100}
                                        min={0}
                                        inputClassName="pr-[88px]"
                                    />
                                    {error && (
                                        <p className="text-red-500 mb-[30px]">{error}</p>
                                    )}
                                    <div>
                                        <InputField
                                            value={challengeForm.duration}
                                            type="number"
                                            label={"Duration"}
                                            rightText="Days"
                                            showClose={false}
                                            onChange={(e) => {
                                                handleUpdateForm({
                                                    duration: e.target.value,
                                                });
                                            }}
                                            step={1}
                                            inputClassName="pr-[88px]"
                                        />
                                    </div>
                                </div>
                            ) : null}
                            {activeTab === "distance" ? (
                                <div>
                                    <InputField
                                        inputMode="decimal"
                                        type="number"
                                        className={` ${
                                            error ? "mb-[10px]" : "mb-[30px]"
                                        }`}
                                        label={"Goal"}
                                        rightText="Distance"
                                        value={challengeForm.distance}
                                        showClose={false}
                                        onChange={(e) => {
                                            handleUpdateForm({
                                                distance: e.target.value,
                                            });
                                        }}
                                        min={0}
                                        step={100}
                                    />
                                    {error && (
                                        <p className="text-red-500 mb-[30px]">{error}</p>
                                    )}
                                    <div>
                                        <InputField
                                            value={challengeForm.duration}
                                            type="number"
                                            label={"Duration"}
                                            rightText="Days"
                                            showClose={false}
                                            onChange={(e) => {
                                                handleUpdateForm({
                                                    duration: e.target.value,
                                                });
                                            }}
                                            step={1}
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
                    buttonDisabled ? "disabled cursor-not-allowed" : ""
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

export default ChallengeStepForm;
