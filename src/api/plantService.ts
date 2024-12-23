// plantService.ts
import { ApiResponse, FamilyType, FormData, GenusType, Plant, PlantUpdateDto } from "../types/types";
import client from "./client";

/**
 * Функция для сохранения нового растения.
 * @param plantData Данные растения.
 * @returns Ответ API с сохраненным растением.
 */
export const savePlant = async (plantData: FormData): Promise<ApiResponse<Plant>> => {
  try {
    // Преобразуем данные перед отправкой
    const preparedData = {
      ...plantData,
      // Убедимся, что координаты отправляются как строки
      latitude: plantData.latitude?.toString(),
      longitude: plantData.longitude?.toString()
    };

    const response = await client.post<ApiResponse<Plant>>('/api/plant/add', preparedData);
    return response.data;
  } catch (error: any) {
    console.error('Ошибка при сохранении растения:', error);
    return {
      success: false,
      message: 'Произошла ошибка при сохранении растения.',
      errors: error.response?.data || error.message,
    };
  }
};

/**
 * Функция для создания нового семейства растений.
 * @param familyName Название семейства.
 * @returns Ответ API с созданным семейством.
 */
export const createFamily = async (familyName: string): Promise<ApiResponse<FamilyType>> => {
  try {
    const response = await client.post<ApiResponse<FamilyType>>('/api/plant/create_family', { familyName });
    return response.data;
  } catch (error: any) {
    console.error('Ошибка при создании семейства:', error);
    return {
      success: false,
      message: 'Произошла ошибка при создании семейства.',
      errors: error.response?.data || error.message,
    };
  }
};

/**
 * Функция для создания нового рода растений.
 * @param genusName Название рода.
 * @returns Ответ API с созданным родом.
 */
export const createGenus = async (genusName: string): Promise<ApiResponse<GenusType>> => {
  try {
    const response = await client.post<ApiResponse<GenusType>>('/api/plant/create_genus', { genusName });
    return response.data;
  } catch (error: any) {
    console.error('Ошибка при создании рода:', error);
    return {
      success: false,
      message: 'Произошла ошибка при создании рода.',
      errors: error.response?.data || error.message,
    };
  }
};

/**
 * Функция для получения всех семейств растений.
 * @returns Массив объектов с id и name семейств.
 */
export const fetchFamilies = async (): Promise<{ id: number; name: string }[]> => {
  try {
    const response = await client.get<ApiResponse<FamilyType[]>>('/api/plant/all_families');
    if (response.data.success && response.data.data) {
      return response.data.data.map((family: FamilyType) => ({
        id: family.familyId,
        name: family.familyName,
      }));
    } else {
      console.error('Ошибка при получении семейств:', response.data.message);
      return [];
    }
  } catch (error: any) {
    console.error('Ошибка при получении семейств:', error);
    return [];
  }
};

/**
 * Функция для получения всех родов растений.
 * @returns Массив объектов с id и name родов.
 */
export const fetchGenera = async (): Promise<{ id: number; name: string }[]> => {
  try {
    const response = await client.get<ApiResponse<GenusType[]>>('/api/plant/all_genuses');
    if (response.data.success && response.data.data) {
      return response.data.data.map((genus: GenusType) => ({
        id: genus.genusId,
        name: genus.genusName,
      }));
    } else {
      console.error('Ошибка при получении родов:', response.data.message);
      return [];
    }
  } catch (error: any) {
    console.error('Ошибка при получении родов:', error);
    return [];
  }
};

/**
 * Функция для получения растений по идентификатору сектора.
 * @param sectorId Идентификатор сектора.
 * @returns Массив растений.
 */
export const getPlantsBySector = async (sectorId: number): Promise<Plant[]> => {
  try {
    const response = await client.get<ApiResponse<Plant[]>>(`/api/plant/sector_plant/${sectorId}`);
    if (response.data.success && response.data.data) {
      return response.data.data.map((plant: Plant) => ({
        ...plant,
        id: plant.plantId, 
      }));
    } else {
      console.error('Ошибка при получении растений:', response.data.message);
      return [];
    }
  } catch (error: any) {
    console.error('Ошибка при получении растений:', error);
    return [];
  }
};

/**
 * Функция для обновления растений.
 * @param plantUpdates Массив данных для обновления растений.
 * @returns Ответ API.
 */
export const updatePlants = async (plantUpdates: PlantUpdateDto[]): Promise<ApiResponse<any>> => {
  try {
    const response = await client.post<ApiResponse<any>>('/api/plant/update', plantUpdates);
    return response.data;
  } catch (error: any) {
    console.error('Ошибка при обновлении растений:', error);
    return {
      success: false,
      message: 'Произошла ошибка при обновлении растений.',
      errors: error.response?.data || error.message,
    };
  }
};

/**
 * Функция для удаления растения.
 * @param plantId Идентификатор растения.
 * @returns Ответ API.
 */
export const deletePlant = async (plantId: number): Promise<ApiResponse<any>> => {
  try {
    const response = await client.delete<ApiResponse<any>>(`/api/plant/delete/${plantId}`);
    return response.data;
  } catch (error: any) {
    console.error('Ошибка при удалении растения:', error);
    return {
      success: false,
      message: 'Произошла ошибка при удалении растения.',
      errors: error.response?.data || error.message,
    };
  }
};
