import L from 'leaflet';
import styles from './AreaPopup.module.css';

interface AreaPopupProps {
  title: string;
  description: string;
}

export const createAreaPopup = ({ title, description }: AreaPopupProps): L.Popup => {
  const container = L.DomUtil.create('div', styles.container);
  
  const content = `
    <div class="${styles.popup}">
      <div class="${styles.content}">
        <div class="${styles.header}">
          <h3 class="${styles.title}">${title}</h3>
        </div>
        ${description ? `<p class="${styles.message}">${description}</p>` : ''}
      </div>
    </div>
  `;
  
  container.innerHTML = content;
  
  return L.popup({
    maxWidth: 300,
    className: styles.leafletPopupCustom,
    closeButton: true,
  }).setContent(container);
}; 