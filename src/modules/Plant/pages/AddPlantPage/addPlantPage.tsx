import React, { useContext, useEffect, useState } from 'react';
import CollapsibleSection from '../../../../components/CollapsibleSection';
import Message from '../../../../components/Misc/Message';
import Navbar from '../../../../components/Navbar/Navbar';
import { FormContext } from '../../../../context/FormContext';
import { useFormActions } from '../../../../hooks/useFormActions';
import { getSectorById } from '../../../../utils/data';
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
  const sector = getSectorById(sectorId);

  const [isEditing, setIsEditing] = useState(false);

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]:
        id === 'latitude' || id === 'longitude'
          ? value === ''
            ? null
            : parseFloat(value)
          : value,
    }));
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const sectionStyles = {
    marginBottom: '1.5rem',
    background: '#ffffff',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
    transition: 'all 0.3s ease',
  };

  return (
    <>
      <Navbar
        sectorId={sectorId}
        pageType='add-plant'
        handleSave={handleSave}
        isEditing={isEditing}
        toggleEditing={toggleEditing}
      />
      <div className={styles.addPlantPage}>
        {saveError && <Message message={saveError} type='error' />}
        {saveSuccess && <Message message={saveSuccess} type='success' />}

        <h2 className={styles.formTitle}>
          Добавить растение
          {sector && (
            <span className={styles.sectorName}>Раздел: {sector.name}</span>
          )}
        </h2>

        <form className={styles.form} onSubmit={handleSave}>
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
        </form>
      </div>
    </>
  );
};

export default AddPlantPage;
