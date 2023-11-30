import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, redirectTo  }) => {
    const IsAuthenticated = localStorage.getItem("token") !== null;

    return IsAuthenticated ? children : <Navigate to={redirectTo}/>
}