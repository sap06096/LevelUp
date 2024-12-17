import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import _ from "lodash";
import {toast, ToastOptions} from "react-toastify";
import {loginAction} from "../../api/userActions.ts";
import {UserResponse} from "../../types/response.ts";
import {loginType} from "../../types/user.ts";
import userStore from "../../zustand/store.ts";

const Login: React.FC = () => {
    const userData = userStore();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [toastStyle] = useState<ToastOptions>({
        position: "bottom-center", // 알림 위치
        autoClose: 2000, // 3초 후 자동 닫힘
        hideProgressBar: true, // 진행 바 표시
        closeOnClick: true, // 클릭하면 닫힘
        pauseOnHover: false, // 마우스 올리면 멈춤
        draggable: true, // 드래그로 닫기 가능
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!id || !password) {
            return;
        }
        
        try{
            const loginForm:loginType = {
                loginId: id,
                loginPwd: password,
            }

            const res:UserResponse = await loginAction(loginForm);
            if(res.result == 0){
                console.log(res);
                if(!_.isEmpty(res.data)){
                    userData.setUser(res.data);
                    userData.saveUserToStorage(res.data.userToken);
                    console.log(userData.getUser());
                    console.log(localStorage.getItem("US_TK"));
                    navigate('/main');
                }else{
                    toast.warning("사용자 정보를 가져오지 못했습니다.", toastStyle)
                }
            }else{
                toast.warning(res.desc, toastStyle)
            }
        }catch (e) {
            toast.warning("로그인 시도 중 에러 발생", toastStyle);
        }
    };

    return (
        <>
            <div className="w-full">
                <div className="flex justify-center items-center h-screen bg-gray-200">
                    <div className="bg-white p-8 rounded-lg shadow-lg mainBox">
                        <h2 className="text-2xl font-semibold mb-6 text-center">로그인</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="id" className="w-full font-bold flex justify-start text-sm font-medium text-gray-700">
                                    아이디
                                </label>
                                <input
                                    id="id"
                                    type="text"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    placeholder="아이디를 입력하세요"
                                    required
                                />
                            </div>
                            <div className="mb-6 relative">
                                <label htmlFor="password" className="w-full font-bold flex justify-start text-sm font-medium text-gray-700">
                                    비밀번호
                                </label>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="비밀번호를 입력하세요"
                                    required
                                />
                                {/* Eye Icon */}
                                {
                                    !showPassword ?
                                        <i className="absolute right-3 top-1/2 transform cursor-pointer bi bi-eye-fill"
                                           style={{fontSize: "1.5rem"}} onClick={() => {setShowPassword(!showPassword)}}></i>
                                        :
                                        <i className="absolute right-3 top-1/2 transform cursor-pointer bi bi-eye-slash"
                                           style={{fontSize: "1.5rem"}} onClick={() => {setShowPassword(!showPassword)}}></i>
                                }
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                            >
                                로그인
                            </button>
                        </form>
                        <div className="border-t border-gray-300 my-4"></div>
                        <div className="flex px-3 text-1xl justify-center">
                            <div className="text-gray-500">
                                <Link to="/signUp" style={{color: 'gray'}}>아이디 찾기</Link>
                            </div>
                            <div className="border-l border-gray-300 h-full mx-4" />
                            <div className="text-gray-500">
                                <Link to="/signUp" style={{ color: 'gray' }}>비밀번호 찾기</Link>
                            </div>
                            <div className="border-l border-gray-300 h-full mx-4" />
                            <div className="text-gray-500">
                                <Link to="/signUp" style={{ color: 'gray' }}>회원가입</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;