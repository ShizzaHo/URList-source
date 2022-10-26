import { useState, useContext } from 'react';
import ServiceContext from '../../context/service-context';
import { useHistory } from 'react-router-dom';
import { Iservice } from '../../interfaces';
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
  useIonAlert,
  IonList,
} from '@ionic/react';
import { settingsSharp, add, search } from 'ionicons/icons';
import CategoryItem from '../../components/category-item/index';
import './styles.css';

import { observer } from 'mobx-react';

import { SortList } from '../../utils/sort';
import SortButton from '../../components/sort-button';

import { App } from '@capacitor/app';
import { useIonRouter } from '@ionic/react';
import { Icategory } from '../../interfaces/index';
import { sortFavoriteAndSplit } from '../../utils/sort/index';
import { generateReactKey } from '../../utils/generator/index';
import Spacer from '../../components/spacer';
const Category = () => {
  const Service: Iservice = useContext(ServiceContext);

  const [presentAlert] = useIonAlert();
  const [sortMethod, setSortMethod] = useState(
    localStorage.getItem('URLIST_SORTMETHOD')
  );
  const history = useHistory();

  const ionRouter = useIonRouter();
  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
  });

  if (Service.settings.getSettings().guideStart === false) {
    guideDialog();
  }

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonTitle color='light'>{Service.language.category}</IonTitle>
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
          <IonList lines='none'>
            {sortFavoriteAndSplit(Service.data.getCategories(), (sortMethod || "")).map(
              (item: Icategory, index: number) => {
                return (
                  <CategoryItem
                    key={generateReactKey()}
                    title={item.title}
                    desc={item.desc}
                    onOpen={() => {
                      history.push('/openCategory/' + item.id);
                    }}
                    onEdit={() => {
                      history.push('/editCategory/' + item.id);
                    }}
                    onFavorite={() => {
                      Service.data.categoryFavoriteToggle(item.id);
                    }}
                    onDelete={() => {
                      deleteCategoryDialog(item.id);
                    }}
                    isFavorite={item.isFavorite}
                    showIcon={Service.settings.getSettings().showIcons}
                    iconColor={item.iconColor}
                    iconType={item.iconType}
                    showDeleteButton={
                      Service.settings.getSettings().showDeleteButton
                    }
                    swipeIcons={Service.settings.getSettings().swipeIcons}
                  />
                );
              }
            )}
          </IonList>
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
        <Spacer />
      </IonContent>
    </IonPage>
  );

  function guideDialog() {
    presentAlert({
      header: Service.language.guide_dialog_title,
      message: Service.language.guide_dialog_desc,
      buttons: [
        {
          text: Service.language.guide_dialog_NO,
          role: 'cancel',
          handler: () => {
            Service.settings.toggleSetting('guideStart');
          },
        },
        {
          text: Service.language.guide_dialog_OK,
          role: 'confirm',
          handler: () => {
            Service.settings.toggleSetting('guideStart');
            history.push('/guide');
          },
        },
      ],
    });
  }

  function deleteCategoryDialog(id: string) {
    presentAlert({
      header: Service.language.editCategory_delete_title,
      message: Service.language.editCategory_delete_desc,
      buttons: [
        {
          text: Service.language.editCategory_delete_OK,
          role: 'cancel',
        },
        {
          text: Service.language.editCategory_delete_DELETE,
          role: 'confirm',
          handler: () => {
            Service.data.deleteCategory(id);
            history.goBack();
          },
        },
      ],
    });
  }
};

export default observer(Category);
