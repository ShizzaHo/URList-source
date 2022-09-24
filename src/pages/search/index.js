import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SettingsState from '../../store/settings';
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
  useIonAlert,
  IonSearchbar,
  IonBackButton,
} from '@ionic/react';
import { settingsSharp, add, search } from 'ionicons/icons';
import CategoryItem from './../../components/category-item/index';
import './styles.css';
import language from '../../language';

import { observer } from 'mobx-react';
import DataStore from '../../store/data';

import { SortList } from '../../utils/sort';
import SortButton from '../../components/sort-button';

import { App } from '@capacitor/app';
import { useIonRouter } from '@ionic/react';
import LinkItem from './../../components/url-item/index';

const Category = () => {
  const [presentAlert] = useIonAlert();
  const [serachText, setSerachText] = useState('');

  const history = useHistory();

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton color='light' defaultHref='/' />
          </IonButtons>
          <IonSearchbar
            value={serachText}
            onIonChange={(e) => setSerachText(e.detail.value)}
            placeholder={language.search}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
          {DataStore.getLinks()
            .filter((item) =>
              item.title.toUpperCase().includes(serachText.toUpperCase())
            )
            .map((item, index) => {
              return (
                <LinkItem
                  key={item.id}
                  title={item.title}
                  desc={item.desc}
                  onOpen={() => {
                    window.open(item.url);
                  }}
                  onEdit={() => {
                    history.push('/editLink/' + item.id);
                  }}
                  onFavorite={() => {
                    DataStore.linkFavoriteToggle(item.id);
                  }}
                  onDelete={() => {
                    deleteLinkDialog(item.id)
                  }}
                  isFavorite={item.isFavorite}
                  showIcon={SettingsState.getSettings().showIcons}
                  iconColor={item.iconColor}
                  iconType={item.iconType}
                  showDeleteButton={
                    SettingsState.getSettings().showDeleteButton
                  }
                  swipeIcons={SettingsState.getSettings().swipeIcons}
                />
              );
            })}
        </div>
      </IonContent>
    </IonPage>
  );

  function guideDialog() {
    presentAlert({
      header: language.guide_dialog_title,
      message: language.guide_dialog_desc,
      buttons: [
        {
          text: language.guide_dialog_NO,
          role: 'cancel',
          handler: () => {
            SettingsState.toggleSetting('guideStart');
          },
        },
        {
          text: language.guide_dialog_OK,
          role: 'confirm',
          handler: () => {
            SettingsState.toggleSetting('guideStart');
            history.push('/guide');
          },
        },
      ],
    });
  }

  function deleteLinkDialog(id) {
    presentAlert({
      header: language.editCategory_delete_title,
      message: language.editCategory_delete_desc,
      buttons: [
        {
          text: language.editCategory_delete_OK,
          role: 'cancel',
        },
        {
          text: language.editCategory_delete_DELETE,
          role: 'confirm',
          handler: () => {
            DataStore.deleteLink(id);
          },
        },
      ],
    });
  }
};

export default observer(Category);
