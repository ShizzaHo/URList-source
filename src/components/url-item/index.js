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
import { star } from 'ionicons/icons';

import language from '../../language';

function LinkItem({
  title,
  desc,
  onOpen,
  onEdit,
  onFavorite,
  isFavorite,
  showIcon,
  iconColor,
  iconType,
}) {
  return (
    <IonItemSliding>
      <IonItemOptions side='start'>
        <IonItemOption color='tertiary' expandable onClick={onEdit}>
          {language.categoryItem_edit}
        </IonItemOption>
      </IonItemOptions>

      <IonItem onClick={onOpen}>
        <div className='linkitem-iconbox'>
          <div className='linkitem-icon' style={{ backgroundColor: iconColor }}>
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
          </div>
        </div>
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
          {language.categoryItem_favoriteAdd}
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
  isFavorite: false,
  showIcon: true,
  iconColor: 'gray',
  iconType: 'nothing',
};

export default LinkItem;
