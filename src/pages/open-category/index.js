import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonFab,
  IonFabButton,
  IonItem,
  IonLabel,
  IonBackButton,
  useIonAlert
} from '@ionic/react';
import SettingsState from '../../store/settings';
import { add } from 'ionicons/icons';
import './styles.css';

import { SortList } from '../../utils/sort';
import SortButton from '../../components/sort-button';

import { observer } from 'mobx-react';
import DataStore from '../../store/data';
import LinkItem from './../../components/url-item/index';
import language from '../../language';

const OpenCategory = () => {
  const [presentAlert] = useIonAlert();
  const [longPress, setLongPress] = useState(null);
  const [sortMethod, setSortMethod] = useState(
    localStorage.getItem('URLIST_SORTMETHOD')
  );

  const history = useHistory();
  const params = useParams();

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton color='light' defaultHref='/' />
          </IonButtons>
          <IonTitle color='light'>{DataStore.getCategory(params.id).title}</IonTitle>
          <IonButtons slot='end'>
            <SortButton setSortMethod={setSortMethod} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
        {SortList(DataStore.getLinks(), sortMethod)
            .filter((value) => {
              return value.parentID == params.id;
            })
            .map((item, index) => {
              if (item.isFavorite) {
                return (
                  <LinkItem
                    key={item.id}
                    title={item.title}
                    desc={item.url}
                    onOpen={() => {
                      history.push('/openCategory/' + item.id);
                    }}
                    onEdit={() => {
                      history.push('/editLink/' + item.id);
                    }}
                    onFavorite={() => {
                      DataStore.linkFavoriteToggle(item.id);
                    }}
                    onDelete={()=>{
                      deleteLinkDialog(item.id)
                    }}
                    isFavorite={item.isFavorite}
                    showIcon={SettingsState.getSettings().showIcons}
                    iconColor={item.iconColor}
                    iconType={item.iconType}
                    showDeleteButton={SettingsState.getSettings().showDeleteButton}
                    swipeIcons={SettingsState.getSettings().swipeIcons}
                  />
                );
              } else {
                return <></>;
              }
            })}
          {SortList(DataStore.getLinks(), sortMethod)
            .filter((value) => {
              return value.parentID == params.id;
            })
            .map((item, index) => {
              if (!item.isFavorite) {
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
                      DataStore.linkFavoriteToggle(item.id);
                    }}
                    onDelete={()=>{
                      deleteLinkDialog(item.id)
                    }}
                    isFavorite={item.isFavorite}
                    showIcon={SettingsState.getSettings().showIcons}
                    iconColor={item.iconColor}
                    iconType={item.iconType}
                    showDeleteButton={SettingsState.getSettings().showDeleteButton}
                    swipeIcons={SettingsState.getSettings().swipeIcons}
                  />
                );
              } else {
                return <></>;
              }
            })}
        </div>
        <IonFab vertical='bottom' horizontal='center' slot='fixed'>
          <IonFabButton
            className='fab'
            onClick={() => {
              history.push('/openCategory/' + params.id + '/new');
            }}
          >
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );

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

export default observer(OpenCategory);
