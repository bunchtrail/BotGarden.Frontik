// src/modules/Plants/services/plantService.ts

import axios from 'axios';
import { PlantFormData } from '../types/plantTypes';
import API_URL from '../../../utils/data';


export const addPlant = async (plantData: PlantFormData) => {
  try {
    const response = await axios.post(API_URL, plantData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
