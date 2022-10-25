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
        onReload()
      },
    },
    {
      text: service.language.langName_en,
      handler: () => {
        localStorage.setItem('URLIST_LANG', 'english');
        onReload()
      },
    },
    {
      text: service.language.langName_cz,
      handler: () => {
        localStorage.setItem('URLIST_LANG', 'chinese');
        onReload()
      },
    },
    {
      text: service.language.langName_uk,
      handler: () => {
        localStorage.setItem('URLIST_LANG', 'ukrain');
        onReload()
      },
    },
    {
      text: service.language.langName_fr,
      handler: () => {
        localStorage.setItem('URLIST_LANG', 'france');
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
