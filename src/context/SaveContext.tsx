// src/context/SaveContext.tsx

import { createContext } from 'react';

interface SaveContextProps {
  handleSave?: () => void;
  setHandleSave?: (handler: () => void) => void;
  handleReset?: () => void;
  setHandleReset?: (handler: () => void) => void;
}

export const SaveContext = createContext<SaveContextProps>({});
