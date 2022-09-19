import React, { useState } from 'react';
import './styles.css';

import {
  IonLabel,
  IonListHeader,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';

import language from '../../language';
import IconColorPicker from '../icon-color-picker/index';

function CustomizeCategory({ onChangeColor, onChangeType, initColor, initType }) {
  return (
    <>
      <IonListHeader>
        <IonLabel>{language.universal_iconColor}</IonLabel>
      </IonListHeader>

      <IonListHeader>
        <IconColorPicker
          initColor={initColor}
          onChangeColor={(e) => {
            onChangeColor(e);
          }}
        />
        <span>   </span>
        <IonLabel>{language.universal_clickToColorSelect}</IonLabel>
      </IonListHeader>

      <br></br>

      <IonListHeader>
        <IonLabel>{language.universal_iconType}</IonLabel>
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
              {language.universal_nothing}
            </IonSelectOption>
            <IonSelectOption value='favicon'>
              {language.universal_favicon}
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
