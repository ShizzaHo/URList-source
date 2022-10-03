import { useState, useContext } from 'react';
import ServiceContext from '../../context/service-context';
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
  IonBackButton,
  useIonAlert
} from '@ionic/react';
import { add } from 'ionicons/icons';
import './styles.css';

import { SortList } from '../../utils/sort';
import SortButton from '../../components/sort-button';

import { observer } from 'mobx-react';
import LinkItem from './../../components/url-item/index';

const OpenCategory = () => {
  const Service = useContext(ServiceContext);
  const [presentAlert] = useIonAlert();
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
          <IonTitle color='light'>{Service.data.getCategory(params.id).title}</IonTitle>
          <IonButtons slot='end'>
            <SortButton setSortMethod={setSortMethod} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
        {SortList(Service.data.getLinks(), sortMethod)
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
                      Service.data.linkFavoriteToggle(item.id);
                    }}
                    onDelete={()=>{
                      deleteLinkDialog(item.id)
                    }}
                    isFavorite={item.isFavorite}
                    showIcon={Service.settings.getSettings().showIcons}
                    iconColor={item.iconColor}
                    iconType={item.iconType}
                    showDeleteButton={Service.settings.getSettings().showDeleteButton}
                    swipeIcons={Service.settings.getSettings().swipeIcons}
                  />
                );
              } else {
                return null;
              }
            })}
          {SortList(Service.data.getLinks(), sortMethod)
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
                      Service.data.linkFavoriteToggle(item.id);
                    }}
                    onDelete={()=>{
                      deleteLinkDialog(item.id)
                    }}
                    isFavorite={item.isFavorite}
                    showIcon={Service.settings.getSettings().showIcons}
                    iconColor={item.iconColor}
                    iconType={item.iconType}
                    showDeleteButton={Service.settings.getSettings().showDeleteButton}
                    swipeIcons={Service.settings.getSettings().swipeIcons}
                  />
                );
              } else {
                return null;
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

export default observer(OpenCategory);
