import { authApi } from './authApi';

export const getPieceFn = async (idPiece) => {
    const response = await authApi.get(`Piece/${idPiece}`);
    return response.data;
};

export const getAllPiecesFn = async () => {
    const response = await authApi.get(`Piece`);
    return response.data;
};

export const createPieceFn = async (formData) => {
    const response = await authApi.post(`Piece/`, formData);
    return response.data;
};

export const updatePieceFn = async ({ idPiece, ...formData }) => {
    const response = await authApi.put(`Piece/${idPiece}/`, formData);
    return response.data;
};

export const deletePieceFn = async (idPiece) => {
    const response = await authApi.delete(`Piece/${idPiece}`);
    return response.data;
};
