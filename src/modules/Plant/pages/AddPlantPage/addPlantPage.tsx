// src/pages/AddPlantPage/AddPlantPage.tsx
import React, { useContext, useEffect, useState } from 'react';
import CollapsibleSection from '../../../../components/CollapsibleSection';
import ErrorMessage from '../../../../components/Misc/ErrorMessage';
import SuccessMessage from '../../../../components/Misc/SuccessMessage';
import Navbar from '../../../../components/Navbar/Navbar';
import { FormContext } from '../../../../context/FormContext';
import { useFormActions } from '../../../../hooks/useFormActions';
import AdditionalSection from '../../components/AdditionalSection';
import BiometricSection from '../../components/BiometricSection';
import ClassificationSection from '../../components/ClassificationSection';
import IdentificationSection from '../../components/IdentificationSection';
import LocationSection from '../../components/LocationSection';
import OriginSection from '../../components/OriginSection';
import UsageSection from '../../components/UsageSection';
import styles from './AddPlantPage.module.css';

interface AddPlantPageProp {
  sectorId: number;
}

const AddPlantPage: React.FC<AddPlantPageProp> = ({ sectorId }) => {
  const formContext = useContext(FormContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { handleSave, loading, saveError, saveSuccess } = useFormActions();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!formContext) {
    return <div>Loading...</div>;
  }

  const { formData, setFormData } = formContext;

  useEffect(() => {
    setFormData({ ...formData, sectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectorId]);

  const [isIdentificationOpen, setIdentificationOpen] = useState(!isMobile);
  const [isClassificationOpen, setClassificationOpen] = useState(true);
  const [isOriginOpen, setOriginOpen] = useState(true);
  const [isUsageOpen, setUsageOpen] = useState(true);
  const [isLocationOpen, setLocationOpen] = useState(true);
  const [isAdditionalOpen, setAdditionalOpen] = useState(true);
  const [isBiometricOpen, setBiometricOpen] = useState(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]:
        id === 'genusId' || id === 'sectorId' || id === 'familyId'
          ? Number(value)
          : value,
    });
  };

  return (
    <>
      <Navbar
        sectorId={sectorId}
        pageType='add-plant'
        handleSave={handleSave}
      />
      <div className='app-container'>
        <div className={`app-container ${styles.addPlantPage}`}>
          {saveError && <ErrorMessage message={saveError} type='general' />}
          {saveSuccess && <SuccessMessage message={saveSuccess} />}

          <CollapsibleSection
            title='Идентификация'
            isOpen={isIdentificationOpen}
            onToggle={() => setIdentificationOpen(!isIdentificationOpen)}
          >
            <IdentificationSection
              formData={formData}
              handleChange={handleChange}
            />
          </CollapsibleSection>

          <CollapsibleSection
            title='Классификация'
            isOpen={isClassificationOpen}
            onToggle={() => setClassificationOpen(!isClassificationOpen)}
          >
            <ClassificationSection
              formData={formData}
              handleChange={handleChange}
            />
          </CollapsibleSection>

          <CollapsibleSection
            title='Происхождение и Среда Обитания'
            isOpen={isOriginOpen}
            onToggle={() => setOriginOpen(!isOriginOpen)}
          >
            <OriginSection formData={formData} handleChange={handleChange} />
          </CollapsibleSection>

          <CollapsibleSection
            title='Использование и Защита'
            isOpen={isUsageOpen}
            onToggle={() => setUsageOpen(!isUsageOpen)}
          >
            <UsageSection formData={formData} handleChange={handleChange} />
          </CollapsibleSection>

          <CollapsibleSection
            title='Расположение'
            isOpen={isLocationOpen}
            onToggle={() => setLocationOpen(!isLocationOpen)}
          >
            <LocationSection formData={formData} handleChange={handleChange} />
          </CollapsibleSection>

          {sectorId === 2 && (
            <CollapsibleSection
              title='Биометрические Данные'
              isOpen={isBiometricOpen}
              onToggle={() => setBiometricOpen(!isBiometricOpen)}
            >
              <BiometricSection
                formData={formData}
                handleChange={handleChange}
              />
            </CollapsibleSection>
          )}

          <CollapsibleSection
            title='Дополнительная Информация'
            isOpen={isAdditionalOpen}
            onToggle={() => setAdditionalOpen(!isAdditionalOpen)}
          >
            <AdditionalSection
              formData={formData}
              handleChange={handleChange}
            />
          </CollapsibleSection>

          {loading && <div className={styles.loading}>Сохранение...</div>}
        </div>
      </div>
    </>
  );
};

export default AddPlantPage;
