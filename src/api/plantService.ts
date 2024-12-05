import { FamilyType, FormData, GenusType, Plant } from "../types/types";
import { API_URL } from "../utils/data";
import client from "./client";

export const savePlant = async (plantData: FormData): Promise<Response> => {
  return fetch(`${API_URL}/api/plant/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(plantData),
  });
};

export const fetchFamilies = async (): Promise<{ id: number; name: string }[]> => {
  const response = await client.get<{ families: FamilyType[] }>('/api/plant/all_families');

  return Array.isArray(response.data.families)
    ? response.data.families.map((family: FamilyType) => ({
        id: family.familyId,
        name: family.familyName,
      }))
    : [];
};

export const fetchGenera = async (): Promise<{ id: number; name: string }[]> => {
  const response = await client.get<{ genuses: GenusType[] }>('/api/plant/all_genuses');

  return Array.isArray(response.data.genuses)
    ? response.data.genuses.map((genus: GenusType) => ({
        id: genus.genusId,
        name: genus.genusName,
      }))
    : [];
};

export const getPlantsBySector = async (sectorId: number): Promise<Plant[]> => {
  try {
    const response = await client.get<Plant[]>(`/api/plant/sector_plant/${sectorId}`);

    return Array.isArray(response.data)
      ? response.data.map((plant) => ({
          ...plant,
          id: plant.plantId, 
        }))
      : [];
  } catch (error) {
    console.error('Error fetching plants:', error);
    return [];
  }
};