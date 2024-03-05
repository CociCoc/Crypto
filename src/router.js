import {BrowserRouter, Routes, Route} from 'react-router-dom';
import RegisterUser from "./components/RegisterUser";
import App from "./App";
import Chart from "./components/Chart";
import Login from "./components/Login";


export const router  = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/register" element={<RegisterUser />} />
                <Route path="/chart" element={<Chart />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

