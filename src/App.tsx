import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/auth/loginPage.tsx';
import {useEffect} from "react";
import './App.css'
import SignUp from "./pages/auth/signUp.tsx";

const App: React.FC = () => {
    useEffect(()=> {
        console.log("여기는 시작페이지입니다.");
    })
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/signUp" element={<SignUp />} />
                    {/* 다른 페이지 추가 가능 */}
                </Routes>
            </Router>
        </>
    );
};

export default App;
