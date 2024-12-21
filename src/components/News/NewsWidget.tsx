import React from 'react';
import styles from './NewsWidget.module.css';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  text: string;
}

const NewsWidget: React.FC = () => {
  // Здесь в будущем можно подключить получение новостей с сервера
  const mockNews: NewsItem[] = [
    {
      id: 1,
      title: 'Обновление системы',
      date: '15.03.2024',
      text: 'Добавлены новые функции для управления растениями',
    },
    {
      id: 2,
      title: 'Новый раздел карты',
      date: '14.03.2024',
      text: 'Теперь доступна интерактивная карта сада',
    },
    {
      id: 3,
      title: 'Техническое обслуживание',
      date: '13.03.2024',
      text: 'Плановые работы по улучшению производительности',
    },
  ];

  return (
    <div className={styles.newsWidget}>
      <h3 className={styles.newsTitle}>Последние новости</h3>
      <div className={styles.newsList}>
        {mockNews.map((news) => (
          <div key={news.id} className={styles.newsItem}>
            <div className={styles.newsHeader}>
              <span className={styles.newsDate}>{news.date}</span>
              <h4 className={styles.newsItemTitle}>{news.title}</h4>
            </div>
            <p className={styles.newsText}>{news.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsWidget;
