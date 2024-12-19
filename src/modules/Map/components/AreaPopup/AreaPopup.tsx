import L from 'leaflet';
import React from 'react';
import styles from './AreaPopup.module.css';

interface AreaPopupProps {
  title: string;
  description: string;
}

export const createAreaPopup = ({ title, description }: AreaPopupProps): L.Popup => {
  const container = L.DomUtil.create('div', styles.popupContainer);
  
  const content = `
    <div class="${styles.popupContent}">
      <h3 class="${styles.title}">${title}</h3>
      ${description ? `<p class="${styles.description}">${description}</p>` : ''}
    </div>
  `;
  
  container.innerHTML = content;
  
  return L.popup({
    maxWidth: 300,
    className: styles.customPopup,
  }).setContent(container);
}; 