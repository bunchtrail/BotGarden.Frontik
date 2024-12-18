
const API_URL = import.meta.env.VITE_API_URL;

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
    const plants: Plant[] = [
        { id: 1, name: 'Растение 1', species: 'Вид 1', description: 'Описание 1', sectorId: 1 },
        { id: 2, name: 'Растение 2', species: 'Вид 2', description: 'Описание 2', sectorId: 1 },
        { id: 3, name: 'Растение 3', species: 'Вид 1', description: 'Описание 3', sectorId: 2 },
    ];
    return plants.filter((plant) => plant.sectorId === sectorId);
};

export { API_URL };