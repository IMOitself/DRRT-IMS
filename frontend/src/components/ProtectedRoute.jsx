import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles }) {
    const { user, loading, isLoggedIn } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center text-subtext">
                <p>Checking authentication...</p>
            </div>
        );
    }

    if (!isLoggedIn) {
        return <Navigate to="/login-register" replace />;
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        alert("You are not authorized to view this page.");
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}
