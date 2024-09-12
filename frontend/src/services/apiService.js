import axios from 'axios';
import { Hypothesis } from '../models/Hypothesis'; 

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
        return new Hypothesis(response.data.key_words, response.data.weight);
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'hypothèse:', error);
        throw error;
    }
};

export const deleteHypothesis = async (key_words) => {
    try {
        const response = await apiClient.delete(`/hypothesis?key_words=${key_words}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'hypothèse:', error);
        throw error;
    }
};

export const updateHypothesis = async (hypothesis) => {
    try {
        const response = await apiClient.put('/hypothesis', hypothesis);
        return new Hypothesis(response.data.key_words, response.data.weight);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'hypothèse:', error);
        throw error;
    }
};

export const getHypotheses = async (reset) => {
    try {
        let response = null;
        if (reset) {
            response = await apiClient.get('/hypotheses?reset=true');
        } else {
            response = await apiClient.get('/hypotheses');
        }
        return response.data.map(hypo => new Hypothesis(hypo.key_words, hypo.weight));
    } catch (error) {
        console.error('Erreur lors de la récupération des hypothèses:', error);
        throw error;
    }
};
