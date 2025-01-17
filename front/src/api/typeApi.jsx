// typeApi.jsx
import { authApi } from './authApi';

export const getTypeFn = async (id_Type) => {
    const response = await authApi.get(`type/${id_Type}`);
    return response.data;
};

export const getAllTypesFn = async () => {
    try {
      const response = await authApi.get('type');
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des types:", error);
      throw error;
    }
};

export const createTypeFn = async (formData) => {
    const response = await authApi.post(`type`, formData);
    return response.data;
};

export const updateTypeFn = async ({ id_Type, ...formData }) => {
    const response = await authApi.put(`type/${id_Type}`, formData);
    return response.data;
};

export const deleteTypeFn = async (id_Type) => {
    const response = await authApi.delete(`type/${id_Type}`);
    return response.data;
};