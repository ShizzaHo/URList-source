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
        localStorage.setItem('URLIST_CUSTOMLANG', undefined);
        onReload()
      },
    },
    {
      text: service.language.langName_en,
      handler: () => {
        localStorage.setItem('URLIST_LANG', 'english');
        localStorage.setItem('URLIST_CUSTOMLANG', undefined);
        onReload()
      },
    },
    {
      text: service.language.langName_cz,
      handler: () => {
        localStorage.setItem('URLIST_LANG', 'chinese');
        localStorage.setItem('URLIST_CUSTOMLANG', undefined);
        onReload()
      },
    },
    {
      text: service.language.langName_fr,
      handler: () => {
        localStorage.setItem('URLIST_LANG', 'france');
        localStorage.setItem('URLIST_CUSTOMLANG', undefined);
        onReload()
      },
    },
    {
      text: service.language.langName_uk,
      handler: () => {
        localStorage.setItem('URLIST_LANG', 'ukrain');
        localStorage.setItem('URLIST_CUSTOMLANG', undefined);
        onReload()
      },
    },
    {
      text: service.language.langName_custom,
      handler: () => {
        localStorage.setItem('URLIST_LANG', 'custom');
        localStorage.setItem('URLIST_CUSTOMLANG', undefined);
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
