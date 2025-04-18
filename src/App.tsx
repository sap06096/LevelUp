import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login.tsx';
import './App.css'
import SignUp from "./pages/auth/signUp.tsx";
import PrivateRoute from "./components/privateRoute.tsx";
import Main from "./pages/auth/main.tsx";

const App: React.FC = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signUp" element={<SignUp />} />

                    <Route element={<PrivateRoute />}>
                        <Route path="/main" element={<Main />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
};

export default App;
