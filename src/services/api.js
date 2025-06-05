import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (page = 1, filters = {}, sortOrder = '', pageSize = 20) => {
  try {
    // First, fetch all characters to sort them
    const allCharactersResponse = await axios.get(`${BASE_URL}/character`);
    const totalPages = allCharactersResponse.data.info.pages;
    
    // Fetch all pages in parallel
    const pagePromises = Array.from({ length: totalPages }, (_, i) => 
      axios.get(`${BASE_URL}/character?page=${i + 1}`)
    );
    
    const allPagesResponses = await Promise.all(pagePromises);
    
    // Combine all characters
    let allCharacters = allPagesResponses.flatMap(response => response.data.results);
    
    // Apply filters
    if (filters.name) {
      allCharacters = allCharacters.filter(char => 
        char.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.status) {
      allCharacters = allCharacters.filter(char => 
        char.status.toLowerCase() === filters.status.toLowerCase()
      );
    }
    if (filters.species) {
      allCharacters = allCharacters.filter(char => 
        char.species.toLowerCase() === filters.species.toLowerCase()
      );
    }
    if (filters.gender) {
      allCharacters = allCharacters.filter(char => 
        char.gender.toLowerCase() === filters.gender.toLowerCase()
      );
    }
    if (filters.createdYear) {
      allCharacters = allCharacters.filter(char => 
        new Date(char.created).getFullYear().toString() === filters.createdYear
      );
    }
    
    // Apply sorting
    if (sortOrder) {
      allCharacters.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else if (sortOrder === 'desc') {
          return b.name.localeCompare(a.name);
        }
        return 0;
      });
    }
    
    // Calculate pagination with dynamic page size
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedCharacters = allCharacters.slice(startIndex, endIndex);
    
    return {
      info: {
        count: allCharacters.length,
        pages: Math.ceil(allCharacters.length / pageSize),
        next: page < Math.ceil(allCharacters.length / pageSize) ? page + 1 : null,
        prev: page > 1 ? page - 1 : null
      },
      results: paginatedCharacters
    };
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