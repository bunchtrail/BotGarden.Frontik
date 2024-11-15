// src/config/plantFields.ts
import { PlantFormData } from "../modules/Plants";

export interface FieldConfig {
  label: string;
  name: keyof PlantFormData;
  type: string;
  options?: { value: string; label: string }[];
  colSize: number;
}

export const plantFields: FieldConfig[] = [
  { label: 'Название', name: 'name', type: 'text', colSize: 6 },
  { label: 'Вид', name: 'species', type: 'text', colSize: 6 },
  { label: 'Возраст', name: 'age', type: 'number', colSize: 4 },
  {
    label: 'Тип растения',
    name: 'plantType',
    type: 'select',
    options: [
      { value: '', label: 'Выберите тип' },
      { value: 'tree', label: 'Дерево' },
      { value: 'shrub', label: 'Кустарник' },
      { value: 'flower', label: 'Цветок' },
    ],
    colSize: 8,
  },
  { label: 'Family ID', name: 'FamilyId', type: 'number', colSize: 6 },
  { label: 'Biometric ID', name: 'BiometricId', type: 'number', colSize: 6 },
  { label: 'Sector ID', name: 'SectorId', type: 'number', colSize: 6 },
  { label: 'Genus ID', name: 'GenusId', type: 'number', colSize: 6 },
  { label: 'Inventor Number', name: 'InventorNumber', type: 'text', colSize: 6 },
  { label: 'Variety', name: 'Variety', type: 'text', colSize: 6 },
  { label: 'Form', name: 'Form', type: 'text', colSize: 6 },
  { label: 'Determined', name: 'Determined', type: 'text', colSize: 6 },
  { label: 'Year Of Observation', name: 'YearOfObs', type: 'text', colSize: 6 },
  { label: 'Phenophase Date', name: 'PhenophaseDate', type: 'date', colSize: 6 },
  { label: 'Year', name: 'Year', type: 'number', colSize: 6 },
  { label: 'Measurement Type', name: 'MeasurementType', type: 'text', colSize: 6 },
  { label: 'Value', name: 'Value', type: 'text', colSize: 6 },
  { label: 'Date Of Planting', name: 'DateOfPlanting', type: 'date', colSize: 6 },
  { label: 'Protection Status', name: 'ProtectionStatus', type: 'text', colSize: 6 },
  { label: 'Filled Out', name: 'FilledOut', type: 'text', colSize: 6 },
  { label: 'Herbarium Duplicate', name: 'HerbariumDuplicate', type: 'text', colSize: 6 },
  { label: 'Synonyms', name: 'Synonyms', type: 'textarea', colSize: 12 },
  { label: 'Plant Origin', name: 'PlantOrigin', type: 'text', colSize: 6 },
  { label: 'Natural Habitat', name: 'NaturalHabitat', type: 'textarea', colSize: 12 },
  { label: 'Ecology Biology', name: 'EcologyBiology', type: 'textarea', colSize: 12 },
  { label: 'Economic Use', name: 'EconomicUse', type: 'textarea', colSize: 12 },
  { label: 'Latitude', name: 'Latitude', type: 'number', colSize: 6 },
  { label: 'Longitude', name: 'Longitude', type: 'number', colSize: 6 },
  { label: 'Originator', name: 'Originator', type: 'text', colSize: 6 },
  { label: 'Date', name: 'Date', type: 'date', colSize: 6 },
  { label: 'Country', name: 'Country', type: 'text', colSize: 6 },
  { label: 'Image Path', name: 'ImagePath', type: 'text', colSize: 6 },
  {
    label: 'Herbarium Presence',
    name: 'HerbariumPresence',
    type: 'checkbox',
    colSize: 6,
  },
  { label: 'Note', name: 'Note', type: 'textarea', colSize: 12 },
];