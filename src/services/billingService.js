import api from "@/lib/api";

export const createSubscription = async (plan) => {
    const { data } = await api.post("/billing/subscribe", { plan });
    return data;
};

export const cancelSubscription = async () => {
    const { data } = await api.post("/billing/cancel");
    return data;
};

export const getPayments = async () => {
    const { data } = await api.get("/billing/payments");
    return data;
};
