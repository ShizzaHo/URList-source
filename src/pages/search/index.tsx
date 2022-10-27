import { useState, useContext } from 'react';
import ServiceContext from '../../context/service-context';
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
  IonList,
} from '@ionic/react';
import './styles.css';

import { observer } from 'mobx-react';

import LinkItem from '../../components/url-item/index';
import { Iservice, Ilink } from '../../interfaces/index';
import { sortFavoriteAndSplit } from '../../utils/sort/index';

const Category = () => {
  const Service: Iservice = useContext(ServiceContext);
  const [presentAlert] = useIonAlert();
  const [searchText, setSearchText] = useState<string | undefined>();

  const history = useHistory();

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton color='light' defaultHref='/' />
          </IonButtons>
          <IonSearchbar
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value)}
            placeholder={Service.language.search}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
          <IonList lines='none'>
            {sortFavoriteAndSplit(
              Service.data.getLinks(),
              localStorage.getItem('URLIST_SORTMETHOD') || ''
            )
              .filter((item: any) =>
                (item.title.toUpperCase() + item.url.toUpperCase()).includes(
                  (searchText || '').toUpperCase()
                )
              )
              .map((item: Ilink, index: number) => {
                return (
                  <LinkItem
                    key={item.id}
                    title={item.title}
                    desc={item.url}
                    onOpen={() => {
                      window.open(item.url);
                    }}
                    onEdit={() => {
                      history.push('/editLink/' + item.id);
                    }}
                    onFavorite={() => {
                      Service.data.linkFavoriteToggle(item.id);
                    }}
                    onDelete={() => {
                      deleteLinkDialog(item.id);
                    }}
                    isFavorite={item.isFavorite}
                    showIcon={SettingsState.getSettings().showIcons}
                    iconColor={item.iconColor}
                    iconType={item.iconType}
                    showDeleteButton={
                      Service.settings.getSettings().showDeleteButton
                    }
                    swipeIcons={Service.settings.getSettings().swipeIcons}
                  />
                );
              })}
          </IonList>
        </div>
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
            SettingsState.toggleSetting('guideStart');
          },
        },
        {
          text: Service.language.guide_dialog_OK,
          role: 'confirm',
          handler: () => {
            SettingsState.toggleSetting('guideStart');
            history.push('/guide');
          },
        },
      ],
    });
  }

  function deleteLinkDialog(id: string) {
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
            Service.data.deleteLink(id);
          },
        },
      ],
    });
  }
};

export default observer(Category);
