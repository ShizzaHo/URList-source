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
              <IonItem button key={index} onTouchStart={()=>{touchStart(item)}} onTouchEnd={()=>{touchEnd(item.id)}} onMouseDown={()=>{touchStart(item)}} onMouseUp={()=>{touchEnd(item.id)}} onClick={()=>{history.push('/openCategory/'+item.id);}}>
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

  function touchStart(item) {
    if (!longPress) {
      const timer = setTimeout(()=>{history.push('/editCategory/'+item.id);}, 800);
      setLongPress(timer);
    }
  }

  function touchEnd(id) {
    if (longPress) {
      clearTimeout(longPress);
      setLongPress(null);
    }
  }
};

export default observer(Category);
