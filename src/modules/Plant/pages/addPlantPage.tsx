import React, { useContext, useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize sections based on mobile state
  const [isIdentificationOpen, setIdentificationOpen] = useState(!isMobile);
  const [isClassificationOpen, setClassificationOpen] = useState(false);
  const [isOriginOpen, setOriginOpen] = useState(false);
  const [isUsageOpen, setUsageOpen] = useState(false);
  const [isLocationOpen, setLocationOpen] = useState(false);
  const [isAdditionalOpen, setAdditionalOpen] = useState(false);

  if (!formContext) {
    return <div>Loading...</div>;
  }

  const { formData, setFormData } = formContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  const handleReset = () => {
    if (formContext) {
      setFormData({ ...formData });
    }
  };

  return (
    <div className={styles.addPlantPage}>
      <form className={styles.form} onSubmit={handleSubmit}>
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
