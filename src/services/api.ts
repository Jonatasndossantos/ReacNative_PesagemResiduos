const API_URL = 'https://script.google.com/macros/s/AKfycbwEm-KK5lCIqZfkHwpSTLDFTEGl4dnNaoTLfE2pdGT1bfJgMQ6PSd14LuVYkU4DkBkY/exec';

interface RegisterWasteData {
  data: string;
  categoria: string;
  peso: string;
}

interface Category {
  id: number;
  nome: string;
}

interface WasteRecord {
  id: number;
  data: string;
  categoria: string;
  peso: string;
  atualizado_em: string;
}

export async function fetchCategories() {
  try {
    const response = await fetch(`${API_URL}?tipo=categorias`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const result = await response.json();
    //console.log('Raw API response:', result); // Debug log
    return result as Category[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export async function fetchWasteRecords() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch waste records');
    }
    const result = await response.json();
    return result as WasteRecord[];
  } catch (error) {
    console.error('Error fetching waste records:', error);
    throw error;
  }
}

export async function registerWaste(data: RegisterWasteData) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to register waste');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error registering waste:', error);
    throw error;
  }
} 