import api from "@/lib/api";

export const register = async (email, password) => {
    console.log("Registering with:", email);
    const { data } = await api.post("/auth/register", { email, password });
    console.log("Register Response:", data);
    return data;
};

export const login = async (email, password) => {
    console.log("Logging in with:", email);
    const { data } = await api.post("/auth/login", { email, password });
    console.log("Login Response:", data);
    return data;
};

export const getMe = async () => {
    const { data } = await api.get("/auth/me");
    return data;
};

export const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
};

export const forgotPassword = async (email) => {
    const { data } = await api.post("/auth/forgot-password", { email });
    return data;
};

export const resetPassword = async (token, password) => {
    const { data } = await api.patch(`/auth/reset-password/${token}`, { password });
    return data;
};
