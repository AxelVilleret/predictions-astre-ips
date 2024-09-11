// src/services/apiService.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_BASE_URL, 
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getScores = async () => {
    try {
        const response = await apiClient.get('/scores');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des scores:', error);
        throw error;
    }
};

export const addHypothesis = async (hypothesis) => {
    try {
        const response = await apiClient.post('/hypothesis', hypothesis);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'hypothèse:', error);
        throw error;
    }
};

export const deleteHypothesis = async (hypothesis) => {
    try {
        const response = await apiClient.delete('/hypothesis', hypothesis);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'hypothèse:', error);
        throw error;
    }
};

export const updateHypothesis = async (hypothesis) => {
    try {
        const response = await apiClient.put('/hypothesis', hypothesis);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'hypothèse:', error);
        throw error;
    }
};

export const getHypotheses = async () => {
    try {
        const response = await apiClient.get('/hypotheses');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des hypothèses:', error);
        throw error;
    }
};
