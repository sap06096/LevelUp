import React, {useState} from "react";
import userStore, {tabStore} from "../zustand/store.ts";
import {useNavigate} from "react-router-dom";

const Top:React.FC = () => {

    const [search, setSearch] = useState("");
    const user = userStore();
    const navigate = useNavigate();

    const alertEvent = () => {
        const isConfirmed:boolean = window.confirm("로그아웃 하시겠습니까?");
        if(isConfirmed){
            console.log("logout");
            user.clearUser();
            navigate("/login");
        }
    }

    const tab = tabStore();

    const tabEvent = (arg: string) => {
        console.log("탭이동");
        tab.setActiveTab(arg);
    }

    return (
        <>
            <nav className="px-80 py-4 border-b">
                <div className={"w-full flex justify-end"}>
                    {user.getUser().userToken == null ? (
                        <a href="#" className="text-gray-500 mx-8">
                            로그인/회원가입
                        </a>
                    ) : (
                        <p onClick={alertEvent} className="text-gray-500 mx-8 cursor-pointer">
                            로그아웃
                        </p>
                    )}
                </div>
                <div className={"w-full flex items-center justify-between p-4"}>
                    {/* 왼쪽 로고 및 메뉴 */}
                    <div className="flex items-center space-x-4">
                        <div className="text-2xl font-bold flex items-center">
                            <span className="text-black">⚡ 번개장터</span>
                        </div>
                        {/* 햄버거 메뉴 아이콘 */}
                    </div>

                    {/* 검색창 */}
                    <div className="relative w-96 max-w-full">
                        <input
                            type="text"
                            className="w-full border rounded-full py-2 px-4 pl-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                            placeholder="상품명, 지역명, @상점명 입력"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {/*<button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">*/}
                        {/*    /!*<Search size={20} />*!/*/}
                        {/*</button>*/}
                    </div>

                    {/* 우측 메뉴 */}
                    <div className="flex items-center space-x-4">
                        <p onClick={() => tabEvent('registerProduct')} className="flex items-center space-x-1 text-gray-700">
                            <span>💰</span> <span>판매하기</span>
                        </p>
                        <p onClick={() => tabEvent('myProducts')} className="flex items-center space-x-1 text-gray-700">
                            <span>👤</span> <span>내상점</span>
                        </p>
                        <p onClick={() => tabEvent('messenger')} className="flex items-center space-x-1 text-gray-700">
                            <span>💬</span> <span>번개톡</span>
                        </p>
                    </div>
                </div>
                <div className={"w-full flex"}>
                    <div className="flex justify-between">
                        <i
                            className="bi bi-list mr-5"
                            style={{fontSize: "40px", cursor: "pointer"}}
                        ></i>
                        <a href="#" className="hidden lg:block text-gray-700" style={{alignContent: "center"}}>
                            번개장터 판매자센터
                        </a>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Top;