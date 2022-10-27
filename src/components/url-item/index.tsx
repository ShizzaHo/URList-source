import React, { useRef } from 'react';
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
import { star, trash, pencil, shareSocialSharp, copy } from 'ionicons/icons';
import { pickTextColor } from '../../utils/pickTextColor/index';
import { Iany, Iservice } from '../../interfaces/index';

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
}: Iany) {
  const Service: Iservice = new ServiceModule();
  const ionItemSliding = useRef<any>();

  const callbacks = {
    favorite: () => {
      onFavorite();
      ionItemSliding.current.closeOpened();
    },
    share: () => {
      
    },
    copy: () => {
      
    },
  };

  return (
    <IonItemSliding ref={ionItemSliding}>
      <IonItemOptions side='start'>
        <IonItemOption color='tertiary' onClick={onEdit}>
          <IonIcon slot='icon-only' icon={pencil} />
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
        <IonItemOption color='tertiary' onClick={callbacks.copy}>
          <IonIcon slot='icon-only' icon={copy} />
        </IonItemOption>
        <IonItemOption color='tertiary' onClick={callbacks.share}>
          <IonIcon slot='icon-only' icon={shareSocialSharp} />
        </IonItemOption>
        <IonItemOption color='favorite' onClick={callbacks.favorite}>
          <IonIcon slot='icon-only' icon={star} />
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
