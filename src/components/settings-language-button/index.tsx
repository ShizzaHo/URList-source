import './styles.css';
import { Iany } from '../../interfaces/index';
import {
  IonItem,
  IonLabel,
} from '@ionic/react';

function SettingLanguageButton({ service, onClick, onReload }: Iany) {

  const languageList = [
    {
      text: service.language.langName_ru,
      handler: () => {
        localStorage.setItem('URLIST_LANG', 'russian');
        localStorage.removeItem('URLIST_CUSTOMLANG');
        onReload()
      },
    },
    {
      text: service.language.langName_en,
      handler: () => {
        localStorage.setItem('URLIST_LANG', 'english');
        localStorage.removeItem('URLIST_CUSTOMLANG');
        onReload()
      },
    },
    {
      text: service.language.langName_cz,
      handler: () => {
        localStorage.setItem('URLIST_LANG', 'chinese');
        localStorage.removeItem('URLIST_CUSTOMLANG');
        onReload()
      },
    },
    {
      text: service.language.langName_fr,
      handler: () => {
        localStorage.setItem('URLIST_LANG', 'france');
        localStorage.removeItem('URLIST_CUSTOMLANG');
        onReload()
      },
    },
    {
      text: service.language.langName_uk,
      handler: () => {
        localStorage.setItem('URLIST_LANG', 'ukrain');
        localStorage.removeItem('URLIST_CUSTOMLANG');
        onReload()
      },
    },
    {
      text: service.language.langName_custom,
      handler: () => {
        localStorage.removeItem('URLIST_CUSTOMLANG');
        localStorage.setItem('URLIST_LANG', 'custom');
        onReload()
      },
    },
  ]

  return (
    <IonItem button onClick={() => {onClick(languageList)}}>
      <IonLabel>
        <h2>{service.language.settings_selectLanguage}</h2>
      </IonLabel>
    </IonItem>
  );
}

SettingLanguageButton.defaultProps = {
  service: { language: {} },
};

export default SettingLanguageButton;
