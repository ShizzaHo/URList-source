import React, { useState } from 'react';
import ServiceModule from '../../service';
import './styles.css';

import {
  IonLabel,
  IonListHeader,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';

import IconColorPicker from '../icon-color-picker/index';
import { Icustomize } from '../../interfaces/index';
import { pickTextColor } from '../../utils/pickTextColor/index';
import { IonIcon } from '@ionic/react';
import { chevronDownOutline } from 'ionicons/icons';

function CustomizeCategory({
  onChangeColor,
  onChangeType,
  initColor,
  initType,
  categoryName,
}: Icustomize) {
  const Service = new ServiceModule();

  const [preview, setPreview] = useState({
    color: initColor,
    type: initType,
  });

  const callbacks = {
    setColor: (e: string) => {
      setPreview({
        ...preview,
        color: e,
      });
      onChangeColor(e);
    },
    setType: (e: any) => {
      onChangeType(e.detail.value);
    },
  };

  return (
    <div className='customiconcategory'>
      <div className='customiconcategory-iconbox'>
        <div
          style={{ backgroundColor: preview.color }}
          className='customiconcategory-preview'
        >
          {initType == 'nothing' ? <></> : <></>}
          {initType == 'firstWord' ? (
            <h1
              style={{ color: pickTextColor(preview.color, 'white', 'black') }}
            >
              {categoryName[0]}
            </h1>
          ) : (
            <></>
          )}
        </div>
      </div>
      <IconColorPicker
        initColor={initColor}
        onChangeColor={callbacks.setColor}
        service={Service}
      />
      <div
        className='customiconcategory-type'
        onClick={() => {
          document.getElementById('dialogList')?.click();
        }}
      >
        <span>{Service.language['universal_' + initType]}</span>
        <span>
          <IonIcon slot='end' icon={chevronDownOutline} />
        </span>
      </div>

      <IonSelect
        value={initType}
        onIonChange={callbacks.setType}
        style={{ display: 'none', TouchEvent: 'none' }}
        id='dialogList'
      >
        <IonSelectOption value='nothing'>
          {Service.language.universal_nothing}
        </IonSelectOption>
        <IonSelectOption value='firstWord'>
          {Service.language.universal_firstWord}
        </IonSelectOption>
      </IonSelect>
    </div>
  );
}

CustomizeCategory.defaultProps = {
  onChangeColor: () => {},
  onChangeType: () => {},
  initColor: '#808080',
  initType: 'nothing',
};

export default CustomizeCategory;
