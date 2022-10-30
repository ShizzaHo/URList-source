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
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import './styles.css';

import { observer } from 'mobx-react';

import { exportDataFile } from './module/exporter';
import { importDataFile } from './module/importer';
import { importLinkBoxDataFile } from './module/importer-linkbox';
import { isPlatform } from '@ionic/core';
import { Iservice } from '../../interfaces/index';
import ImportExportHeader from '../../components/import-export-header/index';
import TitleTop from '../../components/title-top/index';
import SettingsBlock from '../../components/settings-block/index';

const NewCategory = () => {
  const Service: Iservice = useContext(ServiceContext);
  const history = useHistory();
  const [scrollLevel, setScrollLevel] = useState(0);

  const callbacks = {
    setScrollLevel: (e: any) => {
      setScrollLevel(e.target.detail.currentY);
    },
    exportJson: () => {
      if (isPlatform('android')) {
        exportDataFile(Service.data.exportDataToJSON());
      } else {
        alert(Service.language.universal_onlyAndroid);
      }
    },
    exportJson2: () => {
      history.push('/universalInput/exportData');
    },
    importJson: async () => {
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
    },
    importJson2: () => {
      history.push('/universalInput/importData');
    },
    importJson3: async () => {
      if (isPlatform('android')) {
        const data = await importLinkBoxDataFile();
        Service.data.importFromJson(await data);
        const win: Window = window;
        win.location = '/';
      } else {
        alert(Service.language.universal_onlyAndroid);
      }
    },
  };

  return (
    <IonPage id='category-page'>
      <ImportExportHeader
        service={Service}
        animationMode={true}
        animationScrollLevel={scrollLevel}
      />
      <IonContent
        fullscreen
        scrollEvents={true}
        onIonScroll={callbacks.setScrollLevel}
      >
        <TitleTop>{Service.language.importExport}</TitleTop>
        <div className=''>
          <SettingsBlock title={Service.language.importExport_export}>
            <IonList lines='none'>
              <IonItem button onClick={callbacks.exportJson}>
                <IonLabel>
                  <h2>{Service.language.importExport_exportJSON}</h2>
                </IonLabel>
              </IonItem>
              <IonItem button onClick={callbacks.exportJson2}>
                <IonLabel>
                  <h2>{Service.language.importExport_exportJSON_2}</h2>
                </IonLabel>
              </IonItem>
            </IonList>
          </SettingsBlock>
          <SettingsBlock title={Service.language.importExport_import}>
            <IonList lines='none'>
              <IonItem button onClick={callbacks.importJson}>
                <IonLabel>
                  <h2>{Service.language.importExport_importJSON}</h2>
                </IonLabel>
              </IonItem>
              <IonItem button onClick={callbacks.importJson2}>
                <IonLabel>
                  <h2>{Service.language.importExport_importJSON_2}</h2>
                </IonLabel>
              </IonItem>
              <IonItem button onClick={callbacks.importJson3}>
                <IonLabel>
                  <h2>{Service.language.importExport_importJSON_3}</h2>
                </IonLabel>
              </IonItem>
            </IonList>
          </SettingsBlock>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default observer(NewCategory);
