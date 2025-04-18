import React from "react";
import {tabStore} from "../zustand/store.ts";

interface BannerProps {
    isSideBanner: boolean;
    toggleSideBanner: () => void;
}

const Banner: React.FC<BannerProps> = ({ isSideBanner, toggleSideBanner }) => {
    const bannerHeight = 56; // 상단 배너 높이 (px)

    const {activeTab, setActiveTab} = tabStore();

    return (
        <>
            {/* 상단 배너 */}
            <div
                className="w-full bg-gray-700 text-white p-3 text-center fixed top-0 left-0 z-50 flex justify-between items-center"
                style={{ height: `${bannerHeight}px` }}
            >
                {/* 햄버거 메뉴 아이콘 */}
                <i
                    className="bi bi-list"
                    style={{ fontSize: "40px", cursor: "pointer" }}
                    onClick={toggleSideBanner}
                ></i>
                {/* 로고 */}
                <div>
                    <img src={"icons/main_logo.png"} alt="logo" style={{ width: "40%" }} />
                </div>
                {/* 검색창 */}
                <div className="mx-auto" style={{ width: "40%" }}>
                    <div className="relative">
                        {/* 돋보기 아이콘 */}
                        <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                        {/* 검색 입력창 */}
                        <input
                            className="rounded-lg bg-gray-300 w-full pl-10 py-2 focus:outline-none"
                            placeholder="검색어를 입력하세요..."
                        />
                        <i className="bi bi-x-circle-fill absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                    </div>
                </div>
                {/* 비어 있는 아이콘 자리 */}
                <i className="bi bi-list" style={{ fontSize: "40px" }}></i>
            </div>

            {/* 사이드바 */}
            <div
                className={`fixed top-0 left-0 h-screen bg-gray-800 text-white z-40 transform duration-300 ease-in-out ${
                    isSideBanner ? "w-80" : "w-20"
                }`}
                style={{ marginTop: `${bannerHeight}px` }}
            >
                <ul className="mt-4">
                    {/* 사이드바 아이템 */}
                    <li
                        className={`flex items-center gap-4 py-3 transition-all duration-300 justify-start pl-6 cursor-pointer
                            ${activeTab === "home" ? "bg-gray-700 text-white" : "hover:shadow-md hover:bg-gray-500"}
                        `}
                        onClick={() => setActiveTab("home")}
                    >
                        <i
                            className="bi bi-house-door-fill"
                            style={{fontSize: "28px", color: activeTab === "home" ? "#fff" : "#ccc"}}
                        ></i>
                        {isSideBanner && <span>홈</span>}
                    </li>
                    <li
                        className={`flex items-center gap-4 py-3 transition-all duration-300 justify-start pl-6 cursor-pointer
                            ${activeTab === "person" ? "bg-gray-700 text-white" : "hover:shadow-md hover:bg-gray-500"}
                        `}
                        onClick={() => setActiveTab("person")}
                    >
                        <i
                            className="bi bi-person-fill"
                            style={{fontSize: "28px", color: activeTab === "person" ? "#fff" : "#ccc"}}
                        ></i>
                        {isSideBanner && <span>프로필</span>}
                    </li>
                    <li
                        className={`flex items-center gap-4 py-3 transition-all duration-300 justify-start pl-6 cursor-pointer
                            ${activeTab === "info" ? "bg-gray-700 text-white" : "hover:shadow-md hover:bg-gray-500"}
                        `}
                        onClick={() => setActiveTab("info")}
                    >
                        <i
                            className="bi bi-gear-fill"
                            style={{fontSize: "28px", color: activeTab === "info" ? "#fff" : "#ccc"}}
                        ></i>
                        {isSideBanner && <span>설정</span>}
                    </li>

                </ul>
            </div>
        </>
    );
};

export default Banner;
