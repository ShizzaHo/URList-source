import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Redirect, Route } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon,
  IonFab,
  IonFabButton,
  IonItem,
  IonLabel,
  IonBackButton,
  IonInput,
  IonTextarea,
} from '@ionic/react';
import { saveSharp } from 'ionicons/icons';
import './styles.css';

import { observer } from 'mobx-react';
import DataStore from '../../store/data';

import { generateCategoryID } from './../../utils/generator/index';
import language from '../../language';
import { exportDataFile } from './module/exporter';
import { importDataFile } from './module/importer';
import { Buffer } from 'buffer';
import { isPlatform } from '@ionic/core';

const NewCategory = () => {
  const history = useHistory();

  const [state, setState] = useState({
    name: '',
    desc: '',
  });

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/' />
          </IonButtons>
          <IonTitle>{language.importExport}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='p-20'>
          <IonButton
            expand='block'
            className='buttonGray'
            onClick={() => {
              if (isPlatform('android')) {
                exportDataFile(DataStore.exportDataToJSON());
              } else {
                alert(language.universal_onlyAndroid);
              }
            }}
          >
            {language.importExport_exportJSON}
          </IonButton>
          <IonButton
            expand='block'
            className='buttonGray'
            onClick={() => {
              history.push('/universalInput/exportData');
            }}
          >
            {language.importExport_exportJSON_2}
          </IonButton>
          <br />
          <IonButton
            expand='block'
            className='buttonGray'
            onClick={async () => {
              if (isPlatform('android')) {
                const data = await importDataFile();
                DataStore.importFromJson(await data);
                window.location = '/';
              } else {
                alert(language.universal_onlyAndroid);
              }
            }}
          >
            {language.importExport_importJSON}
          </IonButton>
          <IonButton
            expand='block'
            className='buttonGray'
            onClick={() => {
              history.push('/universalInput/importData');
            }}
          >
            {language.importExport_importJSON_2}
          </IonButton>
          {/* <IonButton
            expand='block'
            className='buttonGray'
            onClick={() => {
              if (isPlatform('android')) {
                
              } else {
                alert(language.universal_onlyAndroid);
              }
            }}
          >
            {language.importExport_importJSON_3}
          </IonButton> */}
          <br />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default observer(NewCategory);
