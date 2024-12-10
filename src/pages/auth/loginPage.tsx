import {useState} from "react";
import {LoginArgs} from "../../types/user.ts";
import {loginActionc} from "../../api/userActions.ts";
import {Link} from "react-router-dom";

interface LoginProps {
    onLogin: (username: string, password: string) => void;
}

const LoginPage: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
        const login:LoginArgs  = { username, password };
        const response = loginAction(login);
    };

    return (
        <>
            <div className="w-full">
                <div className="flex justify-center items-center h-screen bg-gray-200">
                    <div className="bg-white p-8 rounded-lg shadow-lg mainBox">
                        <h2 className="text-2xl font-semibold mb-6 text-center">로그인</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="username" className="w-full font-bold flex justify-start text-sm font-medium text-gray-700">
                                    사용자 이름
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="사용자 이름을 입력하세요"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="w-full font-bold flex justify-start text-sm font-medium text-gray-700">
                                    비밀번호
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="비밀번호를 입력하세요"
                                    required
                                />
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
                                <Link to="/signUp" style={{ color: 'gray' }}>아이디 찾기</Link>
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

export default LoginPage;