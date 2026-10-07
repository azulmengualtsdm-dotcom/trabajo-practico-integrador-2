import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { HomePage } from "../pages/HomePage.jsx";
import { LoginPage } from "../pages/LoginPage.jsx";
import { RegisterPage } from "../pages/RegisterPage.jsx";
import { PrivateRoutes } from "./PrivateRoutes.jsx";
import { PublicRoutes } from "./PublicRoutes.jsx";  
import { Navbar } from "../components/Navbar.jsx";  


export const AppRouter = () => {
   
    const isLogged = localStorage.getItem("isLogged") === "true";


    return (
        <BrowserRouter>
            <Routes>
               
                <Route path="/login" element={
                    <PublicRoutes>
                        <LoginPage />
                    </PublicRoutes>
                } />
               
                <Route path="/register" element={
                    <PublicRoutes>
                        <RegisterPage />
                    </PublicRoutes>
                } />
                <Route path="/" element={
                    <PrivateRoutes>
                        <>
                            <Navbar />
                            <HomePage />
                        </>
                    </PrivateRoutes>
                } />


                <Route path="*" element={
                    isLogged ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
                } />


            </Routes>
        </BrowserRouter>
    );
};
