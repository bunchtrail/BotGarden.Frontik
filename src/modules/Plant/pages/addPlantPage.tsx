import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './AddPlantPage.module.css';
import { FormContext } from '../../../context/FormContext';
import CollapsibleSection from '../../../components/CollapsibleSection';
import IdentificationSection from '../components/IdentificationSection';
import ClassificationSection from '../components/ClassificationSection';
import OriginSection from '../components/OriginSection';
import UsageSection from '../components/UsageSection';
import LocationSection from '../components/LocationSection';
import AdditionalSection from '../components/AdditionalSection';

const AddPlantPage: React.FC = () => {
  const { sectorId } = useParams<{ sectorId: string }>();
  const formContext = useContext(FormContext);

  const [isIdentificationOpen, setIdentificationOpen] = useState(true);
  const [isClassificationOpen, setClassificationOpen] = useState(true);
  const [isOriginOpen, setOriginOpen] = useState(true);
  const [isUsageOpen, setUsageOpen] = useState(true);
  const [isLocationOpen, setLocationOpen] = useState(true);
  const [isAdditionalOpen, setAdditionalOpen] = useState(true);

  if (!formContext) {
    return <div>Loading...</div>;
  }

  const { formData, setFormData } = formContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className={styles.addPlantPage}>
      <h1>
        Добавление растения в сектор{' '}
        {sectorId ? parseInt(sectorId, 10) : 'неизвестно'}
      </h1>
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
