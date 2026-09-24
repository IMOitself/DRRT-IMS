import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, loading, isLoggedIn } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center text-subtext">
                <p>Checking authentication...</p>
            </div>
        );
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                <div className="bg-white border border-blue-border rounded-xl shadow-sm p-6 max-w-sm w-full space-y-4">
                    <h2 className="font-geist text-lg font-bold text-text flex items-center gap-2">
                        <span className="material-symbols-outlined text-red">lock</span>
                        Access Denied
                    </h2>
                    <p className="text-sm text-subtext">
                        This page is only for <span className="font-semibold capitalize">{allowedRoles.map((role) => `${role}s`).join(" and ")}</span>.
                        You are logged in as <span className="font-semibold">{/^[aeiou]/i.test(user.role) ? "an" : "a"} {user.role}</span>.
                    </p>
                    <button
                        onClick={() => navigate("/", { replace: true })}
                        className="w-full font-geist text-sm bg-blue text-white transition-all px-5 py-2 rounded-full font-semibold shadow-sm active:scale-95 hover:bg-blue/70 cursor-pointer"
                    >
                        OK
                    </button>
                </div>
            </div>
        );
    }
    return <Outlet />;
}
