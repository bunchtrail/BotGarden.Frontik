import React, { useContext, useState } from 'react';
import styles from './AddPlantPage.module.css';
import { FormContext } from '../../../context/FormContext';
import CollapsibleSection from '../../../components/CollapsibleSection';
import IdentificationSection from '../components/IdentificationSection';
import ClassificationSection from '../components/ClassificationSection';
import OriginSection from '../components/OriginSection';
import UsageSection from '../components/UsageSection';
import LocationSection from '../components/LocationSection';
import AdditionalSection from '../components/AdditionalSection';

interface AddPlantPageProp {
  sectorId: number;
}

const AddPlantPage: React.FC<AddPlantPageProp> = ({ sectorId }) => {
  const formContext = useContext(FormContext);

  // Определяем, является ли устройство мобильным
  const isMobile = window.innerWidth <= 768;

  // Устанавливаем состояние секций
  const [isIdentificationOpen, setIdentificationOpen] = useState(!isMobile);
  const [isClassificationOpen, setClassificationOpen] = useState(!isMobile);
  const [isOriginOpen, setOriginOpen] = useState(!isMobile);
  const [isUsageOpen, setUsageOpen] = useState(!isMobile);
  const [isLocationOpen, setLocationOpen] = useState(!isMobile);
  const [isAdditionalOpen, setAdditionalOpen] = useState(!isMobile);

  if (!formContext) {
    return <div>Loading...</div>;
  }

  const { formData, setFormData } = formContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className={styles.addPlantPage}>
      <form className={styles.form}>
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
