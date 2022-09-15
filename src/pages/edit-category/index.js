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
  useIonAlert,
} from '@ionic/react';
import { saveSharp, trashSharp } from 'ionicons/icons';
import './styles.css';

import { observer } from 'mobx-react';
import DataStore from '../../store/data';

const EditCategory = () => {
  const [presentAlert] = useIonAlert();

  const history = useHistory();
  const params = useParams();

  const [state, setState] = useState({
    name: DataStore.getCategory(params.id) ? DataStore.getCategory(params.id).title : "",
    desc: DataStore.getCategory(params.id) ? DataStore.getCategory(params.id).desc : "",
  });

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/' />
          </IonButtons>
          <IonTitle>Редактирование категории</IonTitle>
          <IonButtons slot='secondary'>
            <IonButton
              onClick={() => {
                deleteCategoryDialog();
              }}
            >
              <IonIcon slot='icon-only' icon={trashSharp} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='p-10'>
          <IonItem color='no'>
            <IonLabel position='floating'>Название категории</IonLabel>
            <IonInput
              value={state.name}
              onIonChange={(e) => {
                setState({ ...state, name: e.detail.value });
              }}
            ></IonInput>
          </IonItem>
          <IonItem color='no'>
            <IonLabel position='floating'>Описание категории</IonLabel>
            <IonTextarea
              value={state.desc}
              rows={6}
              onIonChange={(e) => {
                setState({ ...state, desc: e.detail.value });
              }}
            ></IonTextarea>
          </IonItem>
        </div>
        <IonFab vertical='bottom' horizontal='center' slot='fixed'>
          <IonFabButton
            className='fab'
            onClick={() => {
              DataStore.editCategory(params.id, {
                title: state.name,
                desc: state.desc,
                id: params.id,
              });
              history.goBack();
            }}
          >
            <IonIcon icon={saveSharp} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );

  function deleteCategoryDialog() {
    presentAlert({
      header: 'Вы уверены?',
      message: 'Отменить удаление будет невозможно!',
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
        },
        {
          text: 'Удалить',
          role: 'confirm',
          handler: () => {
            DataStore.deleteCategory(params.id);
            history.goBack();
          },
        },
      ],
    });
  }
};

export default observer(EditCategory);
