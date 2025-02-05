import { authApi } from './authApi';

export const getProfessionnelFn = async (idProfessionnel) => {
    const response = await authApi.get(`Professionnel/${idProfessionnel}`);
    return response.data;
};

export const getAllProfessionnelsFn = async () => {
    const response = await authApi.get(`Professionnel`);
    return response.data;
};

export const createProfessionnelFn = async (formData) => {
    const response = await authApi.post(`Professionnel/`, formData);
    console.log("donnee recu au niveau de lapi:",formData);
    return response.data;
};

export const updateProfessionnelFn = async ({ idProfessionnel, ...formData }) => {
    const response = await authApi.put(`Professionnel/${idProfessionnel}/`, formData);
    return response.data;
};

export const deleteProfessionnelFn = async (idProfessionnel) => {
    const response = await authApi.delete(`Professionnel/${idProfessionnel}`);
    return response.data;
};
