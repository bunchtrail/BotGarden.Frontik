// src/modules/Map/utils/mapUploader.ts


export const uploadMapFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      resolve(url);
    });
  };
  