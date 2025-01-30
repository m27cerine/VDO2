import { authApi } from './authApi';

export const getSouscategorieFn = async (idSouscategorie) => {
    const response = await authApi.get(`Souscategorie/${idSouscategorie}`);
    return response.data;
};


export const getAllSouscategoriesFn = async () => {
    const response = await authApi.get(`Souscategorie`);
    return response.data;
};

export const getSousCategorieByCategorie = async (categorieId) => {
    const response = await authApi.get(`SousCategorie/categorie/${categorieId}`);
    return response.data;
  };

export const createSouscategorieFn = async (formData) => {
    const response = await authApi.post(`Souscategorie/`, formData);
    return response.data;
};

export const updateSouscategorieFn = async ({ idSouscategorie, ...formData }) => {
    const response = await authApi.put(`Souscategorie/${idSouscategorie}/`, formData);
    return response.data;
};

export const deleteSouscategorieFn = async (idSouscategorie) => {
    const response = await authApi.delete(`Souscategorie/${idSouscategorie}`);
    return response.data;
};
