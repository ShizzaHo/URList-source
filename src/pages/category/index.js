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

const Category = () => {
  const [presentAlert] = useIonAlert();
  const [longPress, setLongPress] = useState(null);
  const [sortMethod, setSortMethod] = useState(
    localStorage.getItem('URLIST_SORTMETHOD')
  );
  const history = useHistory();

  const ionRouter = useIonRouter();
  document.addEventListener('ionBackButton', (ev) => {
    ev.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
  });

  if (SettingsState.getSettings().guideStart === false) {
    guideDialog();
  }

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonTitle color='light'>{language.category}</IonTitle>
          <IonButtons slot='secondary'>
            <IonButton
              color='light'
              onClick={() => {
                history.push('/search');
              }}
            >
              <IonIcon slot='icon-only' icon={search} />
            </IonButton>
            <SortButton setSortMethod={setSortMethod} />
            <IonButton
              color='light'
              onClick={() => {
                history.push('/settings');
              }}
            >
              <IonIcon slot='icon-only' icon={settingsSharp} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
          {SortList(DataStore.getCategories(), sortMethod).map(
            (item, index) => {
              if (item.isFavorite) {
                return (
                  <CategoryItem
                    key={item.id}
                    title={item.title}
                    desc={item.desc}
                    onOpen={() => {
                      history.push('/openCategory/' + item.id);
                    }}
                    onEdit={() => {
                      history.push('/editCategory/' + item.id);
                    }}
                    onFavorite={() => {
                      DataStore.categoryFavoriteToggle(item.id);
                    }}
                    onDelete={() => {
                      deleteCategoryDialog(item.id);
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
              } else {
                return <></>;
              }
            }
          )}
          {SortList(DataStore.getCategories(), sortMethod).map(
            (item, index) => {
              if (!item.isFavorite) {
                return (
                  <CategoryItem
                    key={item.id}
                    title={item.title}
                    desc={item.desc}
                    onOpen={() => {
                      history.push('/openCategory/' + item.id);
                    }}
                    onEdit={() => {
                      history.push('/editCategory/' + item.id);
                    }}
                    onFavorite={() => {
                      DataStore.categoryFavoriteToggle(item.id);
                    }}
                    onDelete={() => {
                      deleteCategoryDialog(item.id);
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
              } else {
                return <></>;
              }
            }
          )}
        </div>
        <IonFab vertical='bottom' horizontal='center' slot='fixed'>
          <IonFabButton
            className='fab'
            onClick={() => {
              history.push('/newCategory');
            }}
          >
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
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

  function deleteCategoryDialog(id) {
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
            DataStore.deleteCategory(id);
            history.goBack();
          },
        },
      ],
    });
  }
};

export default observer(Category);
