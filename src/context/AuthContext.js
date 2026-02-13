"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getMe } from "@/services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("AuthContext: Checking for token...", token ? "Found" : "Not Found");

        if (token) {
            getMe()
                .then((res) => {
                    console.log("AuthContext: getMe success", res.data.user?.email);
                    setUser(res.data.user);
                })
                .catch((err) => {
                    console.error("AuthContext: getMe failed", err.response?.status);
                    localStorage.removeItem("token");
                    setUser(null);
                })
                .finally(() => setLoading(false));
        } else {
            console.log("AuthContext: No token, skipping fetch");
            setLoading(false);
        }
    }, []);

    const loginUser = (userData, token) => {
        localStorage.setItem("token", token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}
