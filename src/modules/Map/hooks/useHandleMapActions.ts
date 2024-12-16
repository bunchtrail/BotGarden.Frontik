// src/hooks/useHandleMapActions.ts

import { useCallback } from 'react';
import { EditMode, MapAction } from '../types';

const useHandleMapActions = (
  setEditMode: (mode: EditMode) => void,
  currentMode: EditMode
) => {
  const handleMapAction = useCallback(
    (action: MapAction) => {
      const newMode =
        action === 'addArea'
          ? currentMode === 'add'
            ? 'none'
            : 'add'
          : action === 'edit'
          ? currentMode === 'edit'
            ? 'none'
            : 'edit'
          : 'none';

      setEditMode(newMode);
    },
    [currentMode, setEditMode]
  );

  return handleMapAction;
};

export default useHandleMapActions;
