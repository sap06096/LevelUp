import React from "react";
import {ApiResponse} from "../types/response.ts";
import {useNavigate} from "react-router-dom";
import {userType} from "../types/user.ts";
import _ from "lodash";

interface CustomAlertProps extends ApiResponse<any>{
    result: number,
    desc: string,
    data?: userType
}

const customAlert: React.FC<CustomAlertProps> = ({result, desc, data}) => {
    const navigate = useNavigate();
    return (
        <>
            {result === 0 && !_.isEmpty(data) ? (
                <div className={"card p-3"}>
                    <div className={"w-full flex justify-center"}>
                        <img src={"icons/main_logo.png"} style={{width:'10%'}}  alt={"메인로고"}/>
                    </div>
                    <div className={"text-sm font-bold"}>
                        {data.name} 회원이 되신 것을 환영합니다!
                    </div>
                    <div className={"w-full flex justify-center"}>
                        <button className={"rounded bg-amber-300 text-white"} onClick={() => {
                            navigate("/loginPage")
                        }}>
                            로그인
                        </button>
                    </div>
                </div>
            ) : (
                <div className={"card"}>
                    <div className={"p-3 font-bold"}>
                        {desc}
                    </div>
                </div>
            )}
        </>
    )
}

export default customAlert;