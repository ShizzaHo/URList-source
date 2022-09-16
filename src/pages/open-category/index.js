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
} from '@ionic/react';
import { add } from 'ionicons/icons';
import './styles.css';

import { SortList } from '../../utils/sort';
import SortButton from '../../components/sort-button';

import { observer } from 'mobx-react';
import DataStore from '../../store/data';

const OpenCategory = () => {
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
            <IonBackButton defaultHref='/' />
          </IonButtons>
          <IonTitle>{DataStore.getCategory(params.id).title}</IonTitle>
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
              return (
                <IonItem
                  button
                  key={index}
                  onTouchStart={() => {
                    touchStart(item);
                  }}
                  onTouchEnd={() => {
                    touchEnd(item);
                  }}
                  onMouseDown={() => {
                    touchStart(item);
                  }}
                  onMouseUp={() => {
                    touchEnd(item);
                  }}
                  onClick={() => {
                    window.open(item.url);
                  }}
                >
                  <IonLabel>
                    <h2>{item.title}</h2>
                    <p>{item.url}</p>
                  </IonLabel>
                </IonItem>
              );
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

  function touchStart(item) {
    if (!longPress) {
      const timer = setTimeout(() => {
        history.push('/editLink/' + item.id);
      }, 800);
      setLongPress(timer);
    }
  }

  function touchEnd(item) {
    if (longPress) {
      clearTimeout(longPress);
      setLongPress(null);
    }
  }
};

export default observer(OpenCategory);
