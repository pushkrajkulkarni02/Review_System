
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    // Check if user is logged in (session exists in localStorage)
    const isAuthenticated = localStorage.getItem("user_id");

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
