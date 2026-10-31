import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        api.get("/user")
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem("token");
                }
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const login = async (token, userData) => {
        localStorage.setItem("token", token);
        setUser(userData);

        if (!userData || userData.membership_application === undefined) {
            try {
                const res = await api.get("/user");
                setUser(res.data);
            } catch (err) {
                toast.error(err?.response?.data?.message || "Failed to fetch full user profile");
            }
        }
    };

    const logout = async () => {
        try {
            await api.post("/logout");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Logout error");
        } finally {
            localStorage.removeItem("token");
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, login, logout, isLoggedIn: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
