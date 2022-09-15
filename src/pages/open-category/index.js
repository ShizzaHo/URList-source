import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Redirect, Route } from 'react-router-dom';
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
  IonBackButton,
  IonInput,
  IonTextarea,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import './styles.css';

import { observer } from 'mobx-react';
import DataStore from '../../store/data';

const OpenCategory = () => {
  const [longPress, setLongPress] = useState(null);

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
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
          {DataStore.getLinks()
            .filter((value) => {
              return value.parentID == params.id;
            })
            .map((item, index) => {
              return (
                <IonItem
                  button
                  key={index}
                  onTouchStart={() => {
                    touchStart();
                  }}
                  onTouchEnd={() => {
                    touchEnd(item);
                  }}
                  onMouseDown={() => {
                    touchStart();
                  }}
                  onMouseUp={() => {
                    touchEnd(item);
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

  function touchStart() {
    setLongPress(new Date().getTime() / 1000);
  }

  function touchEnd(item) {
    const date = new Date().getTime() / 1000;
    if (date - longPress >= 0.3) {
      console.log(item);
      history.push('/editLink/' + item.id);
    } else {
      window.open(item.url);
    }
  }
};

export default observer(OpenCategory);
