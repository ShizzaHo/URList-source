import React from 'react';
import './styles.css';

import {
  IonItem,
  IonLabel,
  IonNote,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
} from '@ionic/react';
import { star, trash, pencil } from 'ionicons/icons';

import language from '../../language';

function LinkItem({
  title,
  desc,
  onOpen,
  onEdit,
  onFavorite,
  onDelete,
  isFavorite,
  showIcon,
  iconColor,
  iconType,
  showDeleteButton,
  swipeIcons,
}) {
  return (
    <IonItemSliding>
      <IonItemOptions side='start'>
        <IonItemOption color='tertiary' expandable onClick={onEdit}>
          {swipeIcons ? (
            <IonIcon slot='icon-only' icon={pencil} />
          ) : (
            language.categoryItem_edit
          )}
        </IonItemOption>
        {showDeleteButton ? (
          <IonItemOption color='danger' expandable onClick={onDelete}>
            <IonIcon slot='icon-only' icon={trash} />
          </IonItemOption>
        ) : (
          <></>
        )}
      </IonItemOptions>

      <IonItem onClick={onOpen}>
        {showIcon ? (
          <div className='linkitem-iconbox'>
            <div
              className='linkitem-icon'
              style={{ backgroundColor: iconColor }}
            >
              {iconType == 'favicon' ? (
                <img
                  src={
                    'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=' +
                    desc +
                    '&size=128'
                  }
                ></img>
              ) : (
                <></>
              )}
              {iconType == 'firstWord' ? (
                <span
                  style={{ color: pickTextColor(iconColor, 'white', 'black') }}
                >
                  {title[0]}
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
        <div>
          <IonLabel>{title}</IonLabel>
          <IonNote>{desc}</IonNote>
        </div>
        {isFavorite ? (
          <IonIcon color='favorite' slot='end' icon={star} />
        ) : (
          <></>
        )}
      </IonItem>

      <IonItemOptions side='end'>
        <IonItemOption color='favorite' expandable onClick={onFavorite}>
          {swipeIcons ? (
            <IonIcon slot='icon-only' icon={star} />
          ) : (
            language.categoryItem_favoriteAdd
          )}
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
}

LinkItem.defaultProps = {
  title: '',
  desc: '',
  onOpen: () => {},
  onEdit: () => {},
  onFavorite: () => {},
  onDelete: () => {},
  isFavorite: false,
  showIcon: true,
  iconColor: 'gray',
  iconType: 'nothing',
  showDeleteButton: false,
  swipeIcons: false,
};

function pickTextColor(bgColor, lightColor, darkColor) {
  const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
  const uicolors = [r / 255, g / 255, b / 255];
  const c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179 ? darkColor : lightColor;
}

export default LinkItem;
