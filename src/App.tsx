import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import AllTestsPage from "./pages/allTests";
import CurrentTestPage from "./pages/testDetails";
import HomePage from "./pages/homePage";

function App() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/tests' element={<AllTestsPage />} />
            <Route path='/tests/details/:testId' element={<CurrentTestPage />} />
        </Routes>
    );
}

export default App;
