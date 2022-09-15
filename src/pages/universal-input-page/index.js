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
import { send } from 'ionicons/icons';
import './styles.css';

import { observer } from 'mobx-react';
import DataStore from '../../store/data';

import { generateCategoryID } from './../../utils/generator/index';

const NewLink = () => {
  const history = useHistory();
  const params = useParams();

  const [state, setState] = useState({
    data: params.mode == "exportData" ? DataStore.exportDataToJSON() : "",
  });

  return (
    <IonPage id='new-link-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/' />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='p-10'>
          <IonItem color='no'>
            <IonLabel position='floating'>Введите/скопируйте необходимые данные</IonLabel>
            <IonTextarea
              value={state.data}
              onIonChange={(e) => {
                setState({ ...state, data: e.detail.value });
              }}
            ></IonTextarea>
          </IonItem>
          <br/>
          <IonLabel position='floating'>После взаимодейтсвия с этим окном, обязательно перезапустите приложение для применения изменений</IonLabel>
          <br/>
          <br/>
          <IonLabel position='floating'>Чтобы применить изменения нажмите на круглую кнопку снизу</IonLabel>
        </div>
        <IonFab vertical='bottom' horizontal='center' slot='fixed'>
          <IonFabButton className='fab' onClick={functionSpec}>
            <IonIcon icon={send} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );

  function functionSpec(){
    if (params.mode === "importData") {
      DataStore.importFromJson(state.data)
    } else {
      history.goBack();
    }
  }
};

export default observer(NewLink);
