import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserByUserToken } from "../api/userActions.ts";
import _ from "lodash";

const PrivateRoute: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // 로딩 상태를 나타내기 위해 null 사용
    const userToken:string | null = localStorage.getItem("US_TK");

    useEffect(() => {
        const validateToken = async (): Promise<boolean> => {
            console.log("여기타냐?")
            if (!userToken) {
                setTimeout(() => {
                    alert("로그인 정보가 없습니다.");
                }, 500);
                return false; // 토큰이 없으면 인증 실패
            }
            try {
                console.log("여기타냐?")
                const res = await getUserByUserToken(userToken);
                console.log(res);
                if(res.result == 0 && !_.isEmpty(res.data)){
                    console.info("login success");
                    return true;
                }else{
                    console.info("login failed");
                    return false;
                }
            } catch (error) {
                console.error("Token validation failed:", error);
                return false; // 예외 발생 시 인증 실패
            }
        };

        // 비동기 함수 호출 및 상태 업데이트
        const checkAuth = async () => {
            const isValid = await validateToken(); // 비동기 호출
            setIsAuthenticated(isValid); // 인증 결과 업데이트
        };

        checkAuth(); // 비동기 함수 실행
    }, [userToken]);

    // 로딩 중 상태
    if (isAuthenticated === null) {
        return <div>Loading...</div>; // 로딩 메시지 또는 컴포넌트
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
