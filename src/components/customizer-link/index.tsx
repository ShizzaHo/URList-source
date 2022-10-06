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

function CustomizeCategory({ onChangeColor, onChangeType, initColor, initType }: Icustomize) {
  const Service = new ServiceModule();

  return (
    <>
      <IonListHeader>
        <IonLabel>{Service.language.universal_iconColor}</IonLabel>
      </IonListHeader>

      <IonListHeader>
        <IconColorPicker
          initColor={initColor}
          onChangeColor={(e: string) => {
            onChangeColor(e);
          }}
        />
        <span>   </span>
        <IonLabel>{Service.language.universal_clickToColorSelect}</IonLabel>
      </IonListHeader>

      <br></br>

      <IonListHeader>
        <IonLabel>{Service.language.universal_iconType}</IonLabel>
      </IonListHeader>
      <IonList>
        <IonItem>
          <IonSelect
            value={initType}
            onIonChange={(e) => {
              onChangeType(e.detail.value);
            }}
          >
            <IonSelectOption value='nothing'>
              {Service.language.universal_nothing}
            </IonSelectOption>
            <IonSelectOption value='firstWord'>
              {Service.language.universal_firstWord}
            </IonSelectOption>
            <IonSelectOption value='favicon'>
              {Service.language.universal_favicon}
            </IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonList>
    </>
  );
}

CustomizeCategory.defaultProps = {
  onChangeColor: () => {},
  onChangeType: () => {},
  initColor: '#808080',
  initType: 'nothing',
};

export default CustomizeCategory;
