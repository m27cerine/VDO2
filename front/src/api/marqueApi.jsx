import { authApi } from './authApi';

export const getMarqueFn = async (idMarque) => {
    const response = await authApi.get(`marque/${idMarque}`);
    return response.data;
};

export const getAllMarquesFn = async () => {
    const response = await authApi.get('marque');
    return response.data;
};

export const createMarqueFn = async (formData) => {
    const response = await authApi.post('marque', formData);
    return response.data;
};

export const updateMarqueFn = async ({ idMarque, ...formData }) => {
    const response = await authApi.put(`marque/${idMarque}`, formData);
    return response.data;
};

export const deleteMarqueFn = async (idMarque) => {
    const response = await authApi.delete(`marque/${idMarque}`);
    return response.data;
};