import { Navigate } from "react-router";


export const PrivateRoutes = ({ children }) => {
    const isLogged = localStorage.getItem("isLogged") === "true";
    return isLogged ? children : <Navigate to="/login" replace />;
};
