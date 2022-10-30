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
  useIonAlert,
  IonList,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import './styles.css';

import { SortList } from '../../utils/sort';
import SortButton from '../../components/sort-button';

import { observer } from 'mobx-react';
import LinkItem from '../../components/url-item/index';
import { sortFavoriteAndSplit } from '../../utils/sort/index';
import { Ilink, Iservice } from '../../interfaces/index';
import { generateReactKey } from '../../utils/generator/index';
import Spacer from '../../components/spacer/index';

const OpenCategory = () => {
  const Service: Iservice = useContext(ServiceContext);
  const [presentAlert] = useIonAlert();
  const [sortMethod, setSortMethod] = useState(
    localStorage.getItem('URLIST_SORTMETHOD')
  );

  const history = useHistory();
  const params = useParams<{ id?: string }>();

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton color='light' defaultHref='/' />
          </IonButtons>
          <IonTitle color='light'>
            {Service.data.getCategory(params.id).title}
          </IonTitle>
          <IonButtons slot='end'>
            <SortButton setSortMethod={setSortMethod} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
          <IonList lines='none'>
            {sortFavoriteAndSplit(Service.data.getLinks(), (sortMethod || ""))
              .filter((value: Ilink) => {
                return value.parentID == params.id;
              })
              .map((item: Ilink, index: number) => {
                return (
                  <LinkItem
                    key={generateReactKey()}
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
                    showIcon={Service.settings.getSettings().showIcons}
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
        <Spacer />
      </IonContent>
    </IonPage>
  );

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

export default observer(OpenCategory);
