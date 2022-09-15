import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
} from '@ionic/react';
import { settingsSharp, add } from 'ionicons/icons';
import './styles.css';

import { observer } from 'mobx-react';
import DataStore from '../../store/data';

import { App } from '@capacitor/app';
import { useIonRouter } from '@ionic/react';

const Category = () => {
  const [longPress, setLongPress] = useState(null)
  const history = useHistory();

  const ionRouter = useIonRouter();
  document.addEventListener('ionBackButton', (ev) => {
    ev.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        
      }
    });
  });

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonTitle>Категории</IonTitle>
          <IonButtons slot='secondary'>
            <IonButton
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
          {DataStore.getCategories().map((item, index) => {
            return (
              <IonItem button key={index} onTouchStart={()=>{touchStart()}} onTouchEnd={()=>{touchEnd(item.id)}} onMouseDown={()=>{touchStart()}} onMouseUp={()=>{touchEnd(item.id)}}>
                <IonLabel>
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
                </IonLabel>
              </IonItem>
            );
          })}
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

  function touchStart() {
    setLongPress(new Date().getTime() / 1000)
  }

  function touchEnd(id) {
    const date = new Date().getTime() / 1000
    if ((date - longPress) >= 0.3) {
      history.push('/editCategory/'+id);
    } else {
      history.push('/openCategory/'+id);
    }
  }
};

export default observer(Category);
