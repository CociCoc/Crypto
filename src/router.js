import {BrowserRouter, Routes, Route} from 'react-router-dom';
import RegisterUser from "./components/RegisterUser";
import App from "./App";
import Chart from "./components/Chart";
import Login from "./components/Login";
import Home from "./components/Home"

export const router  = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<RegisterUser />} />
                <Route path="/chart" element={<Chart />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

