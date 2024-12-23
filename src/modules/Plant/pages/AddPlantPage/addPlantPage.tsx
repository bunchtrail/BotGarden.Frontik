import { LinearProgress } from '@mui/material';
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
  const [completionProgress, setCompletionProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  // Функция для расчета прогресса заполнения формы
  const calculateProgress = (data: any) => {
    const totalFields = Object.keys(data).length;
    const filledFields = Object.values(data).filter(
      (value) => value !== null && value !== ''
    ).length;
    return (filledFields / totalFields) * 100;
  };

  useEffect(() => {
    if (formContext?.formData) {
      setCompletionProgress(calculateProgress(formContext.formData));
    }
  }, [formContext?.formData]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-page', 'add-plant');
    return () => {
      document.body.removeAttribute('data-page');
    };
  }, []);

  if (!formContext) {
    return <div>Loading...</div>;
  }

  const { formData, setFormData } = formContext;

  useEffect(() => {
    setFormData({ ...formData, sectorId });
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
    const { id, value, type } = e.target;
    const newValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [id]: newValue,
    }));
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className={styles.pageContainer}>
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

        <div className={styles.headerSection}>
          <h2 className={styles.formTitle}>
            Добавить растение
            {sector && (
              <span className={styles.sectorName}>Раздел: {sector.name}</span>
            )}
          </h2>
          <div className={styles.progressSection}>
            <div className={styles.progressLabel}>
              Заполнено: {Math.round(completionProgress)}%
            </div>
            <div className={styles.progressBarContainer}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${completionProgress}%` }}
              />
            </div>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSave}>
          <div className={styles.sectionsGrid}>
            <CollapsibleSection
              title={
                <div className={styles.sectionHeader}>
                  <span>Идентификация</span>
                  <button
                    type='button'
                    className={styles.helpButton}
                    title='Основная информация для идентификации растения'
                  >
                    ?
                  </button>
                </div>
              }
              isOpen={isIdentificationOpen}
              onToggle={() => setIdentificationOpen(!isIdentificationOpen)}
            >
              <IdentificationSection
                formData={formData}
                handleChange={handleChange}
              />
            </CollapsibleSection>

            <CollapsibleSection
              title={
                <div className={styles.sectionHeader}>
                  <span>Классификация</span>
                  <button
                    type='button'
                    className={styles.helpButton}
                    title='Таксономическая классификация растения'
                  >
                    ?
                  </button>
                </div>
              }
              isOpen={isClassificationOpen}
              onToggle={() => setClassificationOpen(!isClassificationOpen)}
            >
              <ClassificationSection
                formData={formData}
                handleChange={handleChange}
              />
            </CollapsibleSection>

            <CollapsibleSection
              title={
                <div className={styles.sectionHeader}>
                  <span>Происхождение и Среда Обитания</span>
                  <button
                    type='button'
                    className={styles.helpButton}
                    title='Информация о происхождении и естественной среде обитания'
                  >
                    ?
                  </button>
                </div>
              }
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
              <LocationSection
                formData={formData}
                handleChange={handleChange}
              />
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
          </div>

          {loading && (
            <div className={styles.loadingOverlay}>
              <div className={styles.loadingSpinner}>
                <div>Сохранение...</div>
                <LinearProgress />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddPlantPage;
