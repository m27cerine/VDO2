// wilayaApi.jsx
import { authApi } from './authApi';

export const getWilayaFn = async (id_Wilaya) => {
    const response = await authApi.get(`wilaya/${id_Wilaya}`);
    return response.data;
};

export const getAllWilayasFn = async () => {
    try {
        const response = await authApi.get('wilaya');
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des wilayas:", error);
        throw error;
    }
};

export const createWilayaFn = async (formData) => {
    const response = await authApi.post('wilaya', formData);
    return response.data;
};

export const updateWilayaFn = async ({ id_Wilaya, ...formData }) => {
    const response = await authApi.put(`wilaya/${id_Wilaya}`, formData);
    return response.data;
};

export const deleteWilayaFn = async (id_Wilaya) => {
    const response = await authApi.delete(`wilaya/${id_Wilaya}`);
    return response.data;
};
