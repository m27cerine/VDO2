import { authApi } from './authApi';

export const getModeleFn = async (idModele) => {
    const response = await authApi.get(`Modele/${idModele}`);
    return response.data;
};

export const getAllModelesFn = async () => {
    const response = await authApi.get(`Modele`);
    return response.data;
};

export const getModelesByTypeAndMarque = async (idType, idMarque) => {
    const response = await authApi.get(`Modele/type/${idType}/marque/${idMarque}`);
    return response.data;
};

export const createModeleFn = async (formData) => {
    const response = await authApi.post(`Modele/`, formData);
    return response.data;
};

export const updateModeleFn = async ({ idModele, ...formData }) => {
    const response = await authApi.put(`Modele/${idModele}/`, formData);
    return response.data;
};

export const deleteModeleFn = async (idModele) => {
    const response = await authApi.delete(`Modele/${idModele}`);
    return response.data;
};
