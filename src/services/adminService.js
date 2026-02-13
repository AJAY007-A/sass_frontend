import api from "@/lib/api";

export const getMetrics = async () => {
    const { data } = await api.get("/admin/stats");
    return data;
};

export const getUsers = async (limit = 10) => {
    const { data } = await api.get(`/admin/users?limit=${limit}`);
    return data;
};
