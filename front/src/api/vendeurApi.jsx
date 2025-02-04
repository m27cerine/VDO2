import { authApi } from './authApi';

export const getVendeurFn = async (idVendeur) => {
    const response = await authApi.get(`Vendeur/${idVendeur}`);
    return response.data;
};

export const getAllVendeursFn = async () => {
    const response = await authApi.get(`Vendeur`);
    return response.data;
};

export const createVendeurFn = async (formData) => {
    const response = await authApi.post(`Vendeur/`, formData);
    console.log("donnee recu au niveau de lapi:", formData);
    return response.data;
};

export const updateVendeurFn = async ({ idVendeur, ...formData }) => {
    const response = await authApi.put(`Vendeur/${idVendeur}/`, formData);
    return response.data;
};

export const deleteVendeurFn = async (idVendeur) => {
    const response = await authApi.delete(`Vendeur/${idVendeur}`);
    return response.data;
};
