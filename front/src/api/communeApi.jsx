import { authApi } from './authApi';

export const getCommuneFn = async (idCommune) => {
    const response = await authApi.get(`commune/${idCommune}`);
    return response.data;
};

export const getAllCommunesFn = async () => {
    const response = await authApi.get('commune');
    console.log("commune:", response.data);
    return response.data;
};

export const getCommunesByWilaya = async (wilayaId) => {
    const response = await authApi.get(`commune/wilaya/${wilayaId}`);
    return response.data;
};

export const createCommuneFn = async (formData) => {
    const response = await authApi.post('commune', formData);
    return response.data;
};

export const updateCommuneFn = async ({ idCommune, ...formData }) => {
    const response = await authApi.put(`commune/${idCommune}`, formData);
    return response.data;
};

export const deleteCommuneFn = async (idCommune) => {
    const response = await authApi.delete(`commune/${idCommune}`);
    return response.data;
};
