import { useEffect, useState } from 'react';
import ButtonGroup_Main from '../../components/Button/ButtonGroup_Main';
import HeaderTitle from '../../components/Misc/headerTitle';
import NewsWidget from '../../components/News/NewsWidget';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [isWidgetVisible, setWidgetVisible] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-page', 'home');
    return () => {
      document.body.removeAttribute('data-page');
    };
  }, []);

  const toggleWidget = () => {
    setWidgetVisible((prev) => !prev);
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.newsWidgetContainer}>
        {isWidgetVisible && <NewsWidget />}
        <button onClick={toggleWidget} className={styles.toggleButton}>
          {isWidgetVisible ? 'Скрыть виджет' : 'Показать виджет'}
        </button>
      </div>
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
