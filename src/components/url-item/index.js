import React, {useRef} from 'react';
import ServiceModule from '../../service';
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
import { pickTextColor } from './../../utils/pickTextColor/index';

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
  const Service = new ServiceModule();
  const ionItemSliding = useRef();

  return (
    <IonItemSliding ref={ionItemSliding}>
      <IonItemOptions side='start'>
        <IonItemOption color='tertiary' onClick={onEdit}>
          {swipeIcons ? (
            <IonIcon slot='icon-only' icon={pencil} />
          ) : (
            Service.language.categoryItem_edit
          )}
        </IonItemOption>
        {showDeleteButton ? (
          <IonItemOption color='danger' onClick={onDelete}>
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
        <IonItemOption color='favorite' onClick={()=>{
          onFavorite();
          ionItemSliding.current.closeOpened();
        }}>
          {swipeIcons ? (
            <IonIcon slot='icon-only' icon={star} />
          ) : (
            Service.language.categoryItem_favoriteAdd
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

export default LinkItem;
