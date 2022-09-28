import { useContext } from 'react';
import ServiceContext from '../../context/service-context';
import { useHistory } from 'react-router-dom';
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
import './styles.css';

const Settings = () => {
  const Service = useContext(ServiceContext);
  const [present, dismiss] = useIonActionSheet();
  const history = useHistory();

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton color='light' defaultHref='/' />
          </IonButtons>
          <IonTitle color='light'>{Service.language.settings}</IonTitle>
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
              <h2>{Service.language.settings_importExport}</h2>
            </IonLabel>
          </IonItem>
          <IonItem
            button
            onClick={() => {
              present({
                buttons: [
                  {
                    text: Service.language.langName_ru,
                    handler: () => {
                      localStorage.setItem('URLIST_LANG', 'russian');
                      reload();
                    },
                  },
                  {
                    text: Service.language.langName_en,
                    handler: () => {
                      localStorage.setItem('URLIST_LANG', 'english');
                      reload();
                    },
                  },
                  {
                    text: Service.language.langName_cz,
                    handler: () => {
                      localStorage.setItem('URLIST_LANG', 'chinese');
                      reload();
                    },
                  },
                  {
                    text: Service.language.langName_uk,
                    handler: () => {
                      localStorage.setItem('URLIST_LANG', 'ukrain');
                      reload();
                    },
                  },
                ],
                header: Service.language.settings_selectLanguage_title,
              });
            }}
          >
            <IonLabel>
              <h2>{Service.language.settings_selectLanguage}</h2>
            </IonLabel>
          </IonItem>  
          <IonItem
            button
            onClick={() => {
              Service.settings.toggleSetting('showDeleteButton');
            }}
          >
            <IonLabel>
              <h2>{Service.language.settings_showDeleteButton}</h2>
            </IonLabel>
            <IonCheckbox
              slot='end'
              checked={Service.settings.getSettings().showDeleteButton}
            ></IonCheckbox>
          </IonItem>
          <IonItem
            button
            onClick={() => {
              Service.settings.toggleSetting('swipeIcons');
            }}
          >
            <IonLabel>
              <h2>{Service.language.settings_swipeIcons}</h2>
            </IonLabel>
            <IonCheckbox
              slot='end'
              checked={Service.settings.getSettings().swipeIcons}
            ></IonCheckbox>
          </IonItem>
          <IonItem
            button
            onClick={() => {
              Service.settings.toggleSetting('showIcons');
            }}
          >
            <IonLabel>
              <h2>{Service.language.settings_showIcons}</h2>
            </IonLabel>
            <IonCheckbox
              slot='end'
              checked={Service.settings.getSettings().showIcons}
            ></IonCheckbox>
          </IonItem>
          <IonItem
            button
            onClick={() => {
              history.push("/guide");
            }}
          >
            <IonLabel>
              <h2>{Service.language.settings_guide}</h2>
            </IonLabel>
          </IonItem>
          <IonItem
            button
            onClick={() => {
              history.push('/settings/userAgreement');
            }}
          >
            <IonLabel>
              <h2>{Service.language.settings_userAgreement}</h2>
            </IonLabel>
          </IonItem>
          <IonItem
            button
            onClick={() => {
              history.push('/settings/about');
            }}
          >
            <IonLabel>
              <h2>{Service.language.settings_about}</h2>
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
