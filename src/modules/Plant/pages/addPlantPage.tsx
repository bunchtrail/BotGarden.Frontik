import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../../components/Form/TextInput';
import FormRow from '../../../components/Form/FormRow';
import styles from './AddPlantPage.module.css';

const AddPlantPage: React.FC = () => {
  const { sectorId } = useParams<{ sectorId: string }>();
  const [formData, setFormData] = useState({
    inventorNumber: '',
    familyId: '',
    genusId: '',
    species: '',
    synonyms: '',
    variety: '',
    plantOrigin: '',
    naturalHabitat: '',
    ecologyBiology: '',
    economicUse: '',
    protectionStatus: '',
    latitude: '',
    longitude: '',
    country: '',
    dateOfPlanting: '',
    date: '',
    originator: '',
    herbariumPresence: '',
    herbariumDuplicate: '',
    filledOut: '',
    imagePath: '',
    note: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  const handleReset = () => {
    setFormData({
      inventorNumber: '',
      familyId: '',
      genusId: '',
      species: '',
      synonyms: '',
      variety: '',
      plantOrigin: '',
      naturalHabitat: '',
      ecologyBiology: '',
      economicUse: '',
      protectionStatus: '',
      latitude: '',
      longitude: '',
      country: '',
      dateOfPlanting: '',
      date: '',
      originator: '',
      herbariumPresence: '',
      herbariumDuplicate: '',
      filledOut: '',
      imagePath: '',
      note: '',
    });
  };

  return (
    <div className={styles.addPlantPage}>
      <h1>
        Добавление растения в сектор{' '}
        {sectorId ? parseInt(sectorId, 10) : 'неизвестно'}
      </h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Идентификация</h2>
        <FormRow>
          <Input label='Inventor Number' id='inventorNumber' />
          <Input label='Family ID' id='familyId' />
          <Input label='Genus ID' id='genusId' />
        </FormRow>

        <h2>Классификация</h2>
        <FormRow>
          <Input label='Species' id='species' />
          <Input label='Synonyms' id='synonyms' />
          <Input label='Variety' id='variety' />
        </FormRow>

        <h2>Происхождение и Среда Обитания</h2>
        <FormRow>
          <Input label='Plant Origin' id='plantOrigin' />
          <Input label='Natural Habitat' id='naturalHabitat' />
          <Input label='Ecology Biology' id='ecologyBiology' />
        </FormRow>

        <h2>Использование и Защита</h2>
        <FormRow>
          <Input label='Economic Use' id='economicUse' />
          <Input label='Protection Status' id='protectionStatus' />
        </FormRow>

        <h2>Расположение</h2>
        <FormRow>
          <Input label='Latitude' id='latitude' />
          <Input label='Longitude' id='longitude' />
          <Input label='Country' id='country' />
        </FormRow>

        {/* Section: Additional Information */}
        <h2>Дополнительная Информация</h2>
        <FormRow>
          <Input label='Date Of Planting' id='dateOfPlanting' type='date' />
          <Input label='Date' id='date' type='date' />
          <Input label='Originator' id='originator' />
        </FormRow>
        <FormRow>
          <Input label='Herbarium Presence' id='herbariumPresence' />
          <Input label='Herbarium Duplicate' id='herbariumDuplicate' />
          <Input label='Filled Out' id='filledOut' />
        </FormRow>
        <FormRow>
          <Input label='Image Path' id='imagePath' />
          <Input label='Note' id='note' />
        </FormRow>
      </form>
    </div>
  );
};

export default AddPlantPage;
