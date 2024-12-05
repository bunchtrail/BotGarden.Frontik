// src/types/types.ts
export interface Sector {
    id: number;
    name: string;
  }
  
// src/types/types.ts

export interface Plant {
  id: number | null | undefined;
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
  yearOfObs?: string;
  phenophaseDate?: string;
  year?: string;
  measurementType?: string;
  value?: string;
  dateOfPlanting?: string;
  protectionStatus?: string;
  filledOut?: string;
  herbariumDuplicate?: string;
  synonyms?: string;
  plantOrigin?: string;
  naturalHabitat?: string;
  ecologyBiology?: string;
  economicUse?: string;
  latitude?: number;
  longitude?: number;
  originator?: string;
  date?: string;
  country?: string;
  imagePath?: string;
  herbariumPresence?: boolean;
  note?: string;
}

  
  export interface FormData {
    familyId: number;
    biometricId: number;
    sectorId: number;
    genusId: number;
    inventorNumber: string;
    species: string;
    variety: string;
    form: string;
    determined: string;
    yearOfObs: string;
    phenophaseDate: string;
    year: string;
    measurementType: string;
    value: string;
    dateOfPlanting: string;
    protectionStatus: string;
    filledOut: string;
    herbariumDuplicate: string;
    synonyms: string;
    plantOrigin: string;
    naturalHabitat: string;
    ecologyBiology: string;
    economicUse: string;
    latitude: string;
    longitude: string;
    originator: string;
    date: string;
    country: string;
    imagePath: string;
    herbariumPresence: boolean;
    note: string;
  }

export const initialFormData: FormData = {
  familyId: 0,
  biometricId: 0,
  sectorId: 0,
  genusId: 0,
  inventorNumber: '',
  species: '',
  variety: '',
  form: '',
  determined: '',
  yearOfObs: '',
  phenophaseDate: '',
  year: '',
  measurementType: '',
  value: '',
  dateOfPlanting: '',
  protectionStatus: '',
  filledOut: '',
  herbariumDuplicate: '',
  synonyms: '',
  plantOrigin: '',
  naturalHabitat: '',
  ecologyBiology: '',
  economicUse: '',
  latitude: '',
  longitude: '',
  originator: '',
  date: '',
  country: '',
  imagePath: '',
  herbariumPresence: false,
  note: '',
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