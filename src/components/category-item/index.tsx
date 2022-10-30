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
import { Icategoryitem } from '../../interfaces/index';
import { pickTextColor } from '../../utils/pickTextColor/index';

function CategoryItem({
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
}: Icategoryitem) {
  const Service = new ServiceModule();
  const ionItemSliding = useRef<any>();
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
          <div className='categoryitem-iconbox'>
            <div
              className='categoryitem-icon'
              style={{ backgroundColor: iconColor }}
            >
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
          <IonIcon slot='icon-only' icon={star} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
}

CategoryItem.defaultProps = {
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

export default CategoryItem;
