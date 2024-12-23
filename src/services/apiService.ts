import client from '../api/client';
import { Plant } from '../types/types';

export function getSectorById(id: number) {
    const sectors = [
        { name: 'Дендрология', id: 1 },
        { name: 'Флора', id: 2 },
        { name: 'Цветоводство', id: 3 },
    ];
    return sectors.find(sector => sector.id === id);
}

export const fetchPlantsBySector = async (sectorId: number): Promise<Plant[]> => {
    const response = await client.get(`/plants/sector/${sectorId}`);
    return response.data;
};