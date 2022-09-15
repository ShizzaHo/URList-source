import { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
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
} from '@ionic/react';
import { settingsSharp, add } from 'ionicons/icons';
import './styles.css';

const Settings = () => {
  const history = useHistory();

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/' />
          </IonButtons>
          <IonTitle>Настройки</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
          <IonItem
            button
            onClick={() => {
              history.push('/settings/importExport');
            }}
          >
            <IonLabel>
              <h2>Импорт и экспорт данных</h2>
            </IonLabel>
          </IonItem>
          <IonItem
            button
            onClick={() => {
              history.push('/settings/userAgreement');
            }}
          >
            <IonLabel>
              <h2>Пользовательское соглашение</h2>
            </IonLabel>
          </IonItem>
          <IonItem
            button
            onClick={() => {
              history.push('/settings/about');
            }}
          >
            <IonLabel>
              <h2>О приложении</h2>
            </IonLabel>
          </IonItem>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
