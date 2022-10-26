import React, { useState } from 'react';
import ServiceModule from '../../service';
import './styles.css';

import {
  IonSelect,
  IonSelectOption,
  IonIcon,
} from '@ionic/react';

import IconColorPicker from '../icon-color-picker/index';
import { Icustomize } from '../../interfaces/index';
import { pickTextColor } from '../../utils/pickTextColor/index';
import { chevronDownOutline } from 'ionicons/icons';

function CustomizeLink({
  onChangeColor,
  onChangeType,
  initColor,
  initType,
  linkName,
  service,
  url
}: Icustomize) {
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
              {linkName[0]}
            </h1>
          ) : (
            <></>
          )}
          {initType == 'favicon' ? (
            <img
              src={
                'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=' +
                url +
                '&size=128'
              }
              style={{height: "50%"}}
            ></img>
          ) : (
            <></>
          )}
        </div>
      </div>
      <IconColorPicker
        initColor={initColor}
        onChangeColor={callbacks.setColor}
        service={service}
        categoryName={linkName}
      />
      <div
        className='customiconcategory-type'
        onClick={() => {
          document.getElementById('dialogList')?.click();
        }}
      >
        <span>{service.language['universal_' + initType]}</span>
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
          {service.language.universal_nothing}
        </IonSelectOption>
        <IonSelectOption value='firstWord'>
          {service.language.universal_firstWord}
        </IonSelectOption>
        <IonSelectOption value='favicon'>
          {service.language.universal_favicon}
        </IonSelectOption>
      </IonSelect>
    </div>
  );
}

CustomizeLink.defaultProps = {
  onChangeColor: () => {},
  onChangeType: () => {},
  initColor: '#808080',
  initType: 'nothing',
  linkName: '',
};

export default CustomizeLink;
