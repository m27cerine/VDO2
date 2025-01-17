import { authApi } from './authApi';

export const getMarqueFn = async (idMarque) => {
    const response = await authApi.get(`Marque/${idMarque}`);
    return response.data;
};

export const getAllMarquesFn = async () => {
    const response = await authApi.get(`Marque`);
    return response.data;
};

export const createMarqueFn = async (formData) => {
    const response = await authApi.post(`Marque/`, formData);
    return response.data;
};

export const updateMarqueFn = async ({ idMarque, ...formData }) => {
    const response = await authApi.put(`Marque/${idMarque}/`, formData);
    return response.data;
};

export const deleteMarqueFn = async (idMarque) => {
    const response = await authApi.delete(`Marque/${idMarque}`);
    return response.data;
};
