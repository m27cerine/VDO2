import { authApi } from './authApi';

export const getMotorisationFn = async (idmotorisation) => {
    const response = await authApi.get(`motorisation/${idmotorisation}`);
    return response.data;
};

export const getAllMotorisationsFn = async () => {
    const response = await authApi.get('motorisation');
    return response.data;
};

export const getMotorisationsByModele = async (modeleId) => {
    const response = await authApi.get(`Motorisation/modele/${modeleId}`);
    return response.data;
  };

export const createMotorisationFn = async (formData) => {
    const response = await authApi.post('motorisation', formData);
    return response.data;
};

export const updateMotorisationFn = async ({ idmotorisation, ...formData }) => {
    const response = await authApi.put(`motorisation/${idmotorisation}`, formData);
    return response.data;
};

export const deleteMotorisationFn = async (idmotorisation) => {
    const response = await authApi.delete(`motorisation/${idmotorisation}`);
    return response.data;
};