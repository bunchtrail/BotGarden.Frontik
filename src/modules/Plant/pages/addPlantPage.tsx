import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../../components/Form/TextInput';
import FormRow from '../../../components/Form/FormRow';
import styles from './AddPlantPage.module.css';
import { FormContext, FormProvider } from '../../../context/FormContext';
import Navbar from '../../../components/Navbar/Navbar';

const AddPlantPage: React.FC = () => {
  const { sectorId } = useParams<{ sectorId: string }>();
  const formContext = useContext(FormContext);

  if (!formContext) {
    return <div>Loading...</div>;
  }

  const { formData, setFormData, resetForm } = formContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <FormProvider>
      <div className={styles.addPlantPage}>
        <h1>
          Добавление растения в сектор{' '}
          {sectorId ? parseInt(sectorId, 10) : 'неизвестно'}
        </h1>
        <form className={styles.form}>
          <h2>Идентификация</h2>
          <FormRow>
            <Input
              label='Inventor Number'
              id='inventorNumber'
              value={formData.inventorNumber}
              onChange={handleChange}
              placeholder='Введите номер инвентаризации'
            />
            <Input
              label='Family ID'
              id='familyId'
              value={formData.familyId}
              onChange={handleChange}
              placeholder='Введите ID семейства'
            />
            <Input
              label='Genus ID'
              id='genusId'
              value={formData.genusId}
              onChange={handleChange}
              placeholder='Введите ID рода'
            />
          </FormRow>

          <h2>Классификация</h2>
          <FormRow>
            <Input
              label='Species'
              id='species'
              value={formData.species}
              onChange={handleChange}
              placeholder='Введите вид'
            />
            <Input
              label='Synonyms'
              id='synonyms'
              value={formData.synonyms}
              onChange={handleChange}
              placeholder='Введите синонимы'
            />
            <Input
              label='Variety'
              id='variety'
              value={formData.variety}
              onChange={handleChange}
              placeholder='Введите разновидность'
            />
          </FormRow>

          <h2>Происхождение и Среда Обитания</h2>
          <FormRow>
            <Input
              label='Plant Origin'
              id='plantOrigin'
              value={formData.plantOrigin}
              onChange={handleChange}
              placeholder='Введите происхождение растения'
            />
            <Input
              label='Natural Habitat'
              id='naturalHabitat'
              value={formData.naturalHabitat}
              onChange={handleChange}
              placeholder='Введите естественную среду обитания'
            />
            <Input
              label='Ecology Biology'
              id='ecologyBiology'
              value={formData.ecologyBiology}
              onChange={handleChange}
              placeholder='Введите экологию и биологию'
            />
          </FormRow>

          <h2>Использование и Защита</h2>
          <FormRow>
            <Input
              label='Economic Use'
              id='economicUse'
              value={formData.economicUse}
              onChange={handleChange}
              placeholder='Введите экономическое использование'
            />
            <Input
              label='Protection Status'
              id='protectionStatus'
              value={formData.protectionStatus}
              onChange={handleChange}
              placeholder='Введите статус защиты'
            />
          </FormRow>

          <h2>Расположение</h2>
          <FormRow>
            <Input
              label='Latitude'
              id='latitude'
              value={formData.latitude}
              onChange={handleChange}
              placeholder='Введите широту'
            />
            <Input
              label='Longitude'
              id='longitude'
              value={formData.longitude}
              onChange={handleChange}
              placeholder='Введите долготу'
            />
            <Input
              label='Country'
              id='country'
              value={formData.country}
              onChange={handleChange}
              placeholder='Введите страну'
            />
          </FormRow>

          <h2>Дополнительная Информация</h2>
          <FormRow>
            <Input
              label='Date Of Planting'
              id='dateOfPlanting'
              type='date'
              value={formData.dateOfPlanting}
              onChange={handleChange}
            />
            <Input
              label='Date'
              id='date'
              type='date'
              value={formData.date}
              onChange={handleChange}
            />
            <Input
              label='Originator'
              id='originator'
              value={formData.originator}
              onChange={handleChange}
              placeholder='Введите инициатора'
            />
          </FormRow>
          <FormRow>
            <Input
              label='Herbarium Presence'
              id='herbariumPresence'
              value={formData.herbariumPresence}
              onChange={handleChange}
              placeholder='Введите наличие гербария'
            />
            <Input
              label='Herbarium Duplicate'
              id='herbariumDuplicate'
              value={formData.herbariumDuplicate}
              onChange={handleChange}
              placeholder='Введите дубликат гербария'
            />
            <Input
              label='Filled Out'
              id='filledOut'
              value={formData.filledOut}
              onChange={handleChange}
              placeholder='Введите заполнено'
            />
          </FormRow>
          <FormRow>
            <Input
              label='Image Path'
              id='imagePath'
              value={formData.imagePath}
              onChange={handleChange}
              placeholder='Введите путь к изображению'
            />
            <Input
              label='Note'
              id='note'
              value={formData.note}
              onChange={handleChange}
              placeholder='Введите заметку'
            />
          </FormRow>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddPlantPage;
