import { authApi } from './authApi';

export const getCategorieFn = async (idCategorie) => {
    const response = await authApi.get(`Categorie/${idCategorie}`);
    return response.data;
};

export const getAllCategoriesFn = async () => {
    const response = await authApi.get(`Categorie`);
    return response.data;
};

export const createCategorieFn = async (formData) => {
    const response = await authApi.post(`Categorie/`, formData);
    return response.data;
};

export const updateCategorieFn = async ({ idCategorie, ...formData }) => {
    const response = await authApi.put(`Categorie/${idCategorie}/`, formData);
    return response.data;
};

export const deleteCategorieFn = async (idCategorie) => {
    const response = await authApi.delete(`Categorie/${idCategorie}`);
    return response.data;
};
