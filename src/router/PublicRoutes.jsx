import { Navigate } from "react-router";


export const PublicRoutes = ({ children }) => {
    const isLogged = localStorage.getItem("isLogged") === "true";
    return !isLogged ? children : <Navigate to="/" replace />;
};
