import './styles.css';
import { Iany } from '../../interfaces/index';
import {
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
} from '@ionic/react';

function SettingsHeader({
  service,
  animationMode,
  animationScrollLevel,
}: Iany) {
  console.log(animationScrollLevel);
  
  return (
    <div className={animationMode === true ? animationScrollLevel > 70 ? "settingsheader_on" : "settingsheader_off" : undefined}>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton color='light' defaultHref='/' />
          </IonButtons>
          <IonTitle color='light'>{service.language.settings}</IonTitle>
        </IonToolbar>
      </IonHeader>
    </div>
  );
}

SettingsHeader.defaultProps = {
  service: { language: {} },
  animationMode: false,
  animationScrollLevel: 0,
};

export default SettingsHeader;
