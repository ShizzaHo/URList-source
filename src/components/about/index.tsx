import './styles.css';
import { Iany } from '../../interfaces/index';
import {
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
} from '@ionic/react';

function AboutHeader({
  service,
  animationMode,
  animationScrollLevel,
}: Iany) {
  return (
    <div className={animationMode === true ? animationScrollLevel > 70 ? "settingsheader_on" : "settingsheader_off" : undefined}>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton color='light' defaultHref='/' />
          </IonButtons>
          <IonTitle color='light'>{service.language.about}</IonTitle>
        </IonToolbar>
      </IonHeader>
    </div>
  );
}

AboutHeader.defaultProps = {
  service: { language: {} },
  animationMode: false,
  animationScrollLevel: 0,
};

export default AboutHeader;
