// src/modules/Map/utils/mapUploader.ts

import { uploadMapImage } from '../services/mapService';

export async function uploadMapFile(file: File): Promise<string | null> {
  return await uploadMapImage(file);
}
  