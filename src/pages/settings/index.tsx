import { useContext, useState } from 'react';
import ServiceContext from '../../context/service-context';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  isPlatform,
  useIonActionSheet,
  IonCheckbox,
  IonList,
} from '@ionic/react';
import './styles.css';
import { Iservice } from '../../interfaces/index';
import SettingsHeader from '../../components/settings-header';
import SettingLanguageButton from '../../components/settings-language-button/index';
import SettingsBlock from '../../components/settings-block';
import TitleTop from '../../components/title-top';

const Settings = () => {
  const Service: Iservice = useContext(ServiceContext);
  const [present, dismiss] = useIonActionSheet();
  const history = useHistory();

  const [scrollLevel, setScrollLevel] = useState(0);

  const callbacks = {
    importExport: () => {
      history.push('/settings/importExport');
    },
    selectLanguage: (langs: any) => {
      present({
        buttons: langs,
        header: Service.language.settings_selectLanguage_title,
      });
    },
    showDeleteButton: () => {
      Service.settings.toggleSetting('showDeleteButton');
    },
    swipeIcons: () => {
      Service.settings.toggleSetting('swipeIcons');
    },
    showIcons: () => {
      Service.settings.toggleSetting('showIcons');
    },
    userAgreement: () => {
      history.push('/settings/userAgreement');
    },
    guide: () => {
      history.push('/guide');
    },
    about: () => {
      history.push('/settings/about');
    },
    setScrollLevel: (e: any) => {      
      setScrollLevel(e.target.detail.currentY);
    }
  };

  return (
    <IonPage id='category-page'>
      <SettingsHeader service={Service} animationMode={true} animationScrollLevel={scrollLevel} />
      <IonContent fullscreen scrollEvents={true} onIonScroll={callbacks.setScrollLevel}>
        <TitleTop>{Service.language.settings}</TitleTop>
        <div>
          <SettingsBlock title={Service.language.settings_dateBlock}>
            <IonList lines='none'>
              <IonItem button onClick={callbacks.importExport}>
                <IonLabel>
                  <h2>{Service.language.settings_importExport}</h2>
                </IonLabel>
              </IonItem>
            </IonList>
          </SettingsBlock>
          <SettingsBlock title={Service.language.settings_interfaceBlock}>
            <IonList lines='none'>
              <SettingLanguageButton
                service={Service}
                onClick={(langs: any) => {
                  callbacks.selectLanguage(langs);
                }}
                onReload={reload}
              />
              <IonItem button onClick={callbacks.showDeleteButton}>
                <IonLabel>
                  <h2>{Service.language.settings_showDeleteButton}</h2>
                </IonLabel>
                <IonCheckbox
                  slot='end'
                  checked={Service.settings.getSettings().showDeleteButton}
                ></IonCheckbox>
              </IonItem>
              <IonItem button onClick={callbacks.swipeIcons}>
                <IonLabel>
                  <h2>{Service.language.settings_swipeIcons}</h2>
                </IonLabel>
                <IonCheckbox
                  slot='end'
                  checked={Service.settings.getSettings().swipeIcons}
                ></IonCheckbox>
              </IonItem>
              <IonItem button onClick={callbacks.showIcons}>
                <IonLabel>
                  <h2>{Service.language.settings_showIcons}</h2>
                </IonLabel>
                <IonCheckbox
                  slot='end'
                  checked={Service.settings.getSettings().showIcons}
                ></IonCheckbox>
              </IonItem>
            </IonList>
          </SettingsBlock>
          <SettingsBlock title={Service.language.settings_informationBlock}>
          <IonList lines='none'>
            <IonItem button onClick={callbacks.guide}>
              <IonLabel>
                <h2>{Service.language.settings_guide}</h2>
              </IonLabel>
            </IonItem>
            <IonItem button onClick={callbacks.userAgreement}>
              <IonLabel>
                <h2>{Service.language.settings_userAgreement}</h2>
              </IonLabel>
            </IonItem>
            <IonItem button onClick={callbacks.about}>
              <IonLabel>
                <h2>{Service.language.settings_about}</h2>
              </IonLabel>
            </IonItem>
          </IonList>
          </SettingsBlock>
        </div>
      </IonContent>
    </IonPage>
  );

  function reload() {
    const win: Window = window;
    if (isPlatform('android')) {
      win.location = '/';
    } else {
      win.location = '/';
    }
  }
};

export default observer(Settings);
