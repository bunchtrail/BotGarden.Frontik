// src/hooks/useHandleMapActions.ts

import { useCallback, useState } from 'react';

type EditMode = 'none' | 'add' | 'edit';
type MapAction = 'addArea' | 'editArea' | 'disable';

const useHandleMapActions = (setEditMode: (mode: EditMode) => void) => {
  const [currentMode, setCurrentMode] = useState<EditMode>('none');

  const handleMapAction = useCallback((action: MapAction) => {
    const newMode = action === 'addArea' 
      ? (currentMode === 'add' ? 'none' : 'add')
      : action === 'editArea'
      ? (currentMode === 'edit' ? 'none' : 'edit')
      : 'none';

    setCurrentMode(newMode);
    setEditMode(newMode);
  }, [currentMode, setEditMode]);

  return handleMapAction;
};

export default useHandleMapActions;
