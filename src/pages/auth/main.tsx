import React, { useState } from "react";
import {tabStore} from "../../zustand/store.ts";
import Top from "../../components/Top.tsx";
import Home from "../../components/home.tsx";
import Info from "../../components/info.tsx";
import Person from "../../components/person.tsx";
import RegisterProduct from "../../components/registerProduct.tsx";

const MainPage: React.FC = () => {
    const [isSideBanner, setIsSideBanner] = useState<boolean>(false); // 사이드바 상태
    //@ts-ignore
    const toggleSideBanner = () => {
        setIsSideBanner((prev) => !prev);
    };

    //@ts-ignore
    const bannerHeight = 56; // 상단 배너 높이
    //@ts-ignore
    const sideBannerWidth = isSideBanner ? 256 : 64; // 사이드바 너비 (px)

    const { activeTab } = tabStore();

    return (
        <>
            {/* Banner 컴포넌트에 상태 전달 */}
            {/*<Banner isSideBanner={isSideBanner} toggleSideBanner={toggleSideBanner}/>*/}
            {/*<div*/}
            {/*    className="MainPage p-4 transition-all duration-300"*/}
            {/*    style={{*/}
            {/*        marginTop: `${bannerHeight}px`, // 상단 배너 높이만큼 간격 추가*/}
            {/*        marginLeft: `${sideBannerWidth}px`, // 사이드바 너비에 따라 조정*/}
            {/*    }}*/}
            {/*>*/}
            {/*    */}
            {/*</div>*/}

            <Top></Top>
            <div className={"w-full"}>
                { activeTab == 'home' && <Home />}
                { activeTab == 'registerProduct' && <RegisterProduct />}
                { activeTab == 'myProducts' && <Info/>}
                { activeTab == 'messenger' && <Person />}
            </div>
        </>
    );
};

export default MainPage;