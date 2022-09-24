import { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { App } from '@capacitor/app';
import SettingsState from '../../store/settings';
import { observer } from 'mobx-react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonItem,
  IonLabel,
  IonBackButton,
  isPlatform,
  useIonActionSheet,
  IonCheckbox,
} from '@ionic/react';
import { settingsSharp, add } from 'ionicons/icons';
import './styles.css';
import language from '../../language';

const Settings = () => {
  const [present, dismiss] = useIonActionSheet();
  const history = useHistory();

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton color='light' defaultHref='/' />
          </IonButtons>
          <IonTitle color='light'>{language.settings}</IonTitle>
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
              <h2>{language.settings_importExport}</h2>
            </IonLabel>
          </IonItem>
          <IonItem
            button
            onClick={() => {
              present({
                buttons: [
                  {
                    text: language.langName_ru,
                    handler: () => {
                      localStorage.setItem('URLIST_LANG', 'russian');
                      reload();
                    },
                  },
                  {
                    text: language.langName_en,
                    handler: () => {
                      localStorage.setItem('URLIST_LANG', 'english');
                      reload();
                    },
                  },
                  {
                    text: language.langName_cz,
                    handler: () => {
                      localStorage.setItem('URLIST_LANG', 'chinese');
                      reload();
                    },
                  },
                  {
                    text: language.langName_uk,
                    handler: () => {
                      localStorage.setItem('URLIST_LANG', 'ukrain');
                      reload();
                    },
                  },
                ],
                header: language.settings_selectLanguage_title,
              });
            }}
          >
            <IonLabel>
              <h2>{language.settings_selectLanguage}</h2>
            </IonLabel>
          </IonItem>  
          <IonItem
            button
            onClick={() => {
              SettingsState.toggleSetting('showDeleteButton');
            }}
          >
            <IonLabel>
              <h2>{language.settings_showDeleteButton}</h2>
            </IonLabel>
            <IonCheckbox
              slot='end'
              checked={SettingsState.getSettings().showDeleteButton}
            ></IonCheckbox>
          </IonItem>
          <IonItem
            button
            onClick={() => {
              SettingsState.toggleSetting('swipeIcons');
            }}
          >
            <IonLabel>
              <h2>{language.settings_swipeIcons}</h2>
            </IonLabel>
            <IonCheckbox
              slot='end'
              checked={SettingsState.getSettings().swipeIcons}
            ></IonCheckbox>
          </IonItem>
          <IonItem
            button
            onClick={() => {
              SettingsState.toggleSetting('showIcons');
            }}
          >
            <IonLabel>
              <h2>{language.settings_showIcons}</h2>
            </IonLabel>
            <IonCheckbox
              slot='end'
              checked={SettingsState.getSettings().showIcons}
            ></IonCheckbox>
          </IonItem>
          <IonItem
            button
            onClick={() => {
              history.push("/guide");
            }}
          >
            <IonLabel>
              <h2>{language.settings_guide}</h2>
            </IonLabel>
          </IonItem>
          <IonItem
            button
            onClick={() => {
              history.push('/settings/userAgreement');
            }}
          >
            <IonLabel>
              <h2>{language.settings_userAgreement}</h2>
            </IonLabel>
          </IonItem>
          <IonItem
            button
            onClick={() => {
              history.push('/settings/about');
            }}
          >
            <IonLabel>
              <h2>{language.settings_about}</h2>
            </IonLabel>
          </IonItem>
        </div>
      </IonContent>
    </IonPage>
  );

  function reload() {
    if (isPlatform('android')) {
      // App.exitApp();
      window.location = '/';
    } else {
      window.location = '/';
    }
  }
};

export default observer(Settings);
