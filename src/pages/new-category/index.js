import { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  IonTextarea
} from '@ionic/react';
import { saveSharp } from 'ionicons/icons';
import './styles.css';

import { observer } from 'mobx-react';
import DataStore from '../../store/data';

import { generateCategoryID } from './../../utils/generator/index';

const NewCategory = () => {
  const history = useHistory();

  const [state, setState] = useState({
    name: '',
    desc: '',
  });

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/' />
          </IonButtons>
          <IonTitle>Новая категория</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='p-10'>
          <IonItem color="no">
            <IonLabel position='floating'>Название категории</IonLabel>
            <IonInput value={state.name} onIonChange={(e)=>{setState({...state, name: e.detail.value})}}></IonInput>
          </IonItem>
          <IonItem color="no">
            <IonLabel position='floating'>Описание категории</IonLabel>
            <IonTextarea value={state.desc} rows={6} onIonChange={(e)=>{setState({...state, desc: e.detail.value})}}></IonTextarea>
          </IonItem>
        </div>
        <IonFab vertical='bottom' horizontal='center' slot='fixed'>
          <IonFabButton
            className='fab'
            onClick={() => {
              DataStore.createNewCategory({title: state.name, desc: state.desc, id: "category_"+generateCategoryID()})
              history.goBack();
            }}
          >
            <IonIcon icon={saveSharp} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default observer(NewCategory);
