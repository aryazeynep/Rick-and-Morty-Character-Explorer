import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (page = 1, filters = {}) => {
  try {
    const params = new URLSearchParams({
      page,
      ...filters
    });
    
    const response = await axios.get(`${BASE_URL}/character?${params}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch characters');
  }
};

export const fetchCharacterById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/character/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch character details');
  }
}; 