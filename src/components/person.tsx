import React from "react";

const person: React.FC = () => {

    return (
        <>
            {/* 상단 배너 */}
            <div className="w-full  text-black">
                {/* 햄버거 메뉴 아이콘 */}
                <h1>Person Page</h1>
                <p>Person 페이지입니다.</p>
            </div>
        </>
    );
};

export default person;
