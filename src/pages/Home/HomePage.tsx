import ButtonGroup_Main from '../../components/Button/ButtonGroup_Main';
import HeaderTitle from '../../components/Misc/headerTitle';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <HeaderTitle title='Выберите раздел для дальнейшей работы' />
          <p className={styles.subtitle}>
            Добро пожаловать в систему управления ботаническим садом
          </p>
          <ButtonGroup_Main />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
