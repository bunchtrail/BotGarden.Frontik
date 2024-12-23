// src/types/types.ts
export interface Sector {
    id: number;
    name: string;
  }

export interface SearchableColumn {
  field: string;
  label: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    errors?: any; 
  }
// src/types/types.ts

export interface Plant {
  id: number | null | undefined;
  plantId: number;
  familyId?: number | null;
  biometricId?: number | null;
  sectorId?: number | null;
  genusId?: number | null;
  inventorNumber?: string | null;
  species?: string | null;
  variety?: string | null;
  form?: string | null;
  determined?: string | null;
  yearOfObs?: number | null;
  phenophaseDate?: string | null;
  year?: number | null;
  measurementType?: string | null;
  value?: string | null;
  dateOfPlanting?: string | null;
  protectionStatus?: string | null;
  filledOut?: string | null;
  herbariumDuplicate?: string | null;
  synonyms?: string | null;
  plantOrigin?: string | null;
  naturalHabitat?: string | null;
  ecologyBiology?: string | null;
  economicUse?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  originator?: string | null;
  date?: string | null;
  country?: string | null;
  imagePath?: string | null;
  herbariumPresence?: boolean;
  note?: string | null;
}

  
  export interface FormData {
    plantId?: number;
    familyId: number | null;
    biometricId: number | null;
    sectorId: number | null;
    genusId: number | null;
    inventorNumber: string | null;
    species: string | null;
    variety: string | null;
    form: string | null;
    determined: string | null;
    yearOfObs: number | null;
    phenophaseDate: string | null;
    year: number | null;
    measurementType: string | null;
    value: string | null;
    dateOfPlanting: string | null;
    protectionStatus: string | null;
    filledOut: string | null;
    herbariumDuplicate: string | null;
    synonyms: string | null;
    plantOrigin: string | null;
    naturalHabitat: string | null;
    ecologyBiology: string | null;
    economicUse: string | null;
    latitude: string | null;
    longitude: string | null;
    originator: string | null;
    date: string | null;
    country: string | null;
    imagePath: string | null;
    herbariumPresence: boolean;
    note: string | null;
  }

export const initialFormData: FormData = {
  familyId: null,
  biometricId: null,
  sectorId: null,
  genusId: null,
  inventorNumber: null,
  species: null,
  variety: null,
  form: null,
  determined: null,
  yearOfObs: null,
  phenophaseDate: null,
  year: null,
  measurementType: null,
  value: null,
  dateOfPlanting: null,
  protectionStatus: null,
  filledOut: null,
  herbariumDuplicate: null,
  synonyms: null,
  plantOrigin: null,
  naturalHabitat: null,
  ecologyBiology: null,
  economicUse: null,
  latitude: null,
  longitude: null,
  originator: null,
  date: null,
  country: null,
  imagePath: null,
  herbariumPresence: false,
  note: null
};


export interface FamilyType {
    familyId: number;
    familyName: string;
    id: number;
    name: string;
  }
  
  export interface GenusType {
    id: number;
    name: string;
    genusId: number;
    genusName: string;
  }
  
  export interface SectorType {
    id: number;
    name: string;
    sectorId: number;
    sectorName: string;  
  }

export interface PlantUpdateDto {
  plantId: number;
  familyId?: number;
  biometricId?: number;
  sectorId?: number;
  genusId?: number;
  inventorNumber?: string;
  species?: string;
  variety?: string;
  form?: string;
  determined?: string;
  dateOfPlanting?: Date;
  protectionStatus?: string;
  filledOut?: string;
  herbariumDuplicate?: string;
  synonyms?: string;
  plantOrigin?: string;
  naturalHabitat?: string;
  ecologyBiology?: string;
  economicUse?: string;
  originator?: string;
  date?: Date;
  country?: string;
  imagePath?: string;
  note?: string;
  yearOfObs?: number;
  phenophaseDate?: Date;
  year?: number;
  measurementType?: string;
  value?: string;
  latitude?: string;
  longitude?: string;
  herbariumPresence?: boolean;
}