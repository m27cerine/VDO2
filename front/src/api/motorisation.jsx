import { authApi } from './authApi';

export const getMotorisationFn = async (idMotorisation) => {
    const response = await authApi.get(`Motorisation/${idMotorisation}`);
    return response.data;
};

export const getAllMotorisationsFn = async () => {
    const response = await authApi.get(`Motorisation`);
    return response.data;
};

export const createMotorisationFn = async (formData) => {
    const response = await authApi.post(`Motorisation/`, formData);
    return response.data;
};

export const updateMotorisationFn = async ({ idMotorisation, ...formData }) => {
    const response = await authApi.put(`Motorisation/${idMotorisation}/`, formData);
    return response.data;
};

export const deleteMotorisationFn = async (idMotorisation) => {
    const response = await authApi.delete(`Motorisation/${idMotorisation}`);
    return response.data;
};
