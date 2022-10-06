import { useState, useContext } from 'react';
import ServiceContext from '../../context/service-context';
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
  IonBackButton,
} from '@ionic/react';
import './styles.css';

import { observer } from 'mobx-react';

import { exportDataFile } from './module/exporter';
import { importDataFile } from './module/importer';
import { importLinkBoxDataFile } from './module/importer-linkbox';
import { isPlatform } from '@ionic/core';
import { Iservice } from '../../interfaces/index';

const NewCategory = () => {
  const Service: Iservice = useContext(ServiceContext);
  const history = useHistory();

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton color='light' defaultHref='/' />
          </IonButtons>
          <IonTitle color='light'>{Service.language.importExport}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='p-20'>
          <IonButton
            expand='block'
            className='buttonGray'
            onClick={() => {
              if (isPlatform('android')) {
                exportDataFile(Service.data.exportDataToJSON());
              } else {
                alert(Service.language.universal_onlyAndroid);
              }
            }}
          >
            {Service.language.importExport_exportJSON}
          </IonButton>
          <IonButton
            expand='block'
            className='buttonGray'
            onClick={() => {
              history.push('/universalInput/exportData');
            }}
          >
            {Service.language.importExport_exportJSON_2}
          </IonButton>
          <br />
          <IonButton
            expand='block'
            className='buttonGray'
            onClick={async () => {
              if (isPlatform('android')) {
                const data = await importDataFile();
                if (data) {
                  Service.data.importFromJson(await data);
                  const win: Window = window;
                  win.location = '/';
                } else {
                  alert(Service.language.exportError_file);
                }
              } else {
                alert(Service.language.universal_onlyAndroid);
              }
            }}
          >
            {Service.language.importExport_importJSON}
          </IonButton>
          <IonButton
            expand='block'
            className='buttonGray'
            onClick={() => {
              history.push('/universalInput/importData');
            }}
          >
            {Service.language.importExport_importJSON_2}
          </IonButton>
          <IonButton
            expand='block'
            className='buttonGray'
            onClick={async () => {
              if (isPlatform('android')) {
                const data = await importLinkBoxDataFile();
                Service.data.importFromJson(await data);
                const win: Window = window;
                win.location = '/';
              } else {
                alert(Service.language.universal_onlyAndroid);
              }
            }}
          >
            {Service.language.importExport_importJSON_3}
          </IonButton>
          <br />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default observer(NewCategory);
