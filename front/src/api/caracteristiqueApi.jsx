import { authApi } from './authApi';

export const getCaracteristiqueFn = async (idCaracteristique) => {
    const response = await authApi.get(`Caracteristique/${idCaracteristique}`);
    return response.data;
};

export const getAllCaracteristiquesFn = async () => {
    const response = await authApi.get(`Caracteristique`);
    return response.data;
};

export const createCaracteristiqueFn = async (formData) => {
    const response = await authApi.post(`Caracteristique/`, formData);
    return response.data;
};

export const updateCaracteristiqueFn = async ({ idCaracteristique, ...formData }) => {
    const response = await authApi.put(`Caracteristique/${idCaracteristique}/`, formData);
    return response.data;
};

export const deleteCaracteristiqueFn = async (idCaracteristique) => {
    const response = await authApi.delete(`Caracteristique/${idCaracteristique}`);
    return response.data;
};
