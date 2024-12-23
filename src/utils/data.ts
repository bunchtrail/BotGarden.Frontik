const sectors = [
    { name: 'Дендрология', id: 1 },
    { name: 'Флора', id: 2 },
    { name: 'Цветоводство', id: 3 },
];

export interface Sector {
  id: number;
  name: string;
  // Другие поля
}

function getSectorById(id: number) {
    return sectors.find(sector => sector.id === id);
}

export { getSectorById, sectors };

