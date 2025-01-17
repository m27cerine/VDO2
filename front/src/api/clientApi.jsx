import { authApi } from './authApi';

export const getClientFn = async (idClient) => {
    const response = await authApi.get(`Client/${idClient}`);
    return response.data;
};

export const getAllClientsFn = async () => {
    const response = await authApi.get(`Client`);
    return response.data;
};

export const createClientFn = async (formData) => {
    const response = await authApi.post(`Client/`, formData);
    return response.data;
};

export const updateClientFn = async ({ idClient, ...formData }) => {
    const response = await authApi.put(`Client/${idClient}/`, formData);
    return response.data;
};

export const deleteClientFn = async (idClient) => {
    const response = await authApi.delete(`Client/${idClient}`);
    return response.data;
};
