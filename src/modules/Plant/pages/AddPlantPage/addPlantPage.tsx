import React, { useContext, useEffect, useState } from 'react';
import CollapsibleSection from '../../../../components/CollapsibleSection';
import ErrorMessage from '../../../../components/Misc/ErrorMessage';
import { FormContext } from '../../../../context/FormContext';
import AdditionalSection from '../../components/AdditionalSection';
import BiometricSection from '../../components/BiometricSection.tsx';
import ClassificationSection from '../../components/ClassificationSection';
import IdentificationSection from '../../components/IdentificationSection';
import LocationSection from '../../components/LocationSection';
import OriginSection from '../../components/OriginSection';
import UsageSection from '../../components/UsageSection';
import styles from './AddPlantPage.module.css';
import { useFormActions } from '../../../../hooks/useFormActions.ts';

interface AddPlantPageProp {
  sectorId: number;
}

const AddPlantPage: React.FC<AddPlantPageProp> = ({ sectorId }) => {
  const formContext = useContext(FormContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [error, setError] = useState<string>('');
  const { handleSave, handleReset } = useFormActions(); 

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

  // Состояние для секций
  const [isIdentificationOpen, setIdentificationOpen] = useState(!isMobile);
  const [isClassificationOpen, setClassificationOpen] = useState(false);
  const [isOriginOpen, setOriginOpen] = useState(false);
  const [isUsageOpen, setUsageOpen] = useState(false);
  const [isLocationOpen, setLocationOpen] = useState(false);
  const [isAdditionalOpen, setAdditionalOpen] = useState(false);
  const [isBiometricOpen, setBiometricOpen] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.latitude ||
      !formData.longitude ||
      !formData.genusId ||
      !formData.familyId
    ) {
      setError('Пожалуйста, заполните поля широта, долгота, род и семейство.');
      return;
    }

    // Вызов handleSave из useFormActions
    handleSave();
  };

  return (
    <div className={styles.addPlantPage}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && (
          <ErrorMessage
            message={error}
            type='general'
            onDismiss={() => setError('')}
          />
        )}
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
            <BiometricSection formData={formData} handleChange={handleChange} />
          </CollapsibleSection>
        )}

        <CollapsibleSection
          title='Дополнительная Информация'
          isOpen={isAdditionalOpen}
          onToggle={() => setAdditionalOpen(!isAdditionalOpen)}
        >
          <AdditionalSection formData={formData} handleChange={handleChange} />
        </CollapsibleSection>


      </form>
    </div>
  );
};

export default AddPlantPage;
