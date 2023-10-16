import { FC, useEffect, useRef, useState } from "react";

const SlidingTab = ({ tabData, activeTab, handleTabClick }) => {
    const [tabWidth, setTabWidth] = useState(0);
    const [tabLeftPos, setTabLeftPos] = useState(0);
    const tabsRef = useRef([]);

    useEffect(() => {
        const activeTabIndex = tabData.findIndex((tab) => tab.id === activeTab);
        const currentTab = tabsRef.current[activeTabIndex];
        if (currentTab) {
            setTabLeftPos(currentTab.offsetLeft);
            setTabWidth(currentTab.clientWidth);
        }
    }, [activeTab, tabData]);

    return (
        <div
            className={`relative z-0 inline-block rounded-large border border-grey2 bg-white`}
        >
            <ul className="relative flex gap-2">
                {tabData.map((tab, index) => {
                    return (
                        <li
                            role="presentation"
                            key={tab.id}
                            ref={(el) => (tabsRef.current[index] = el)}
                            className={`paragraph2_regular relative z-10 cursor-pointer px-4 py-2 ${
                                activeTab === tab.id ? "text-white" : "text-text-500"
                            }`}
                            onClick={() => handleTabClick(tab.id)}
                        >
                            {tab.label}
                        </li>
                    );
                })}
                <li
                    className={`absolute bottom-0 h-full w-full rounded-large bg-darkGreen transition-all duration-300 `}
                    style={{ left: tabLeftPos, width: tabWidth }}
                />
            </ul>
        </div>
    );
};
export default SlidingTab;
