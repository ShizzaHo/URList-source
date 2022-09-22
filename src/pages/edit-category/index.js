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
  IonListHeader,
  IonSelect,
  IonList,
  IonSelectOption,
} from '@ionic/react';
import { saveSharp, trashSharp } from 'ionicons/icons';
import './styles.css';

import { observer } from 'mobx-react';
import DataStore from '../../store/data';
import language from '../../language';
import IconColorPicker from './../../components/icon-color-picker/index';
import CustomizeCategory from '../../components/customizer-category';

const EditCategory = () => {
  const [presentAlert] = useIonAlert();

  const history = useHistory();
  const params = useParams();

  const [state, setState] = useState({
    name: DataStore.getCategory(params.id)
      ? DataStore.getCategory(params.id).title
      : '',
    desc: DataStore.getCategory(params.id)
      ? DataStore.getCategory(params.id).desc
      : '',
    iconColor: DataStore.getCategory(params.id)
      ? DataStore.getCategory(params.id).iconColor
      : '',
    iconType: DataStore.getCategory(params.id)
      ? DataStore.getCategory(params.id).iconType
      : '',
  });

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton color='light' defaultHref='/' />
          </IonButtons>
          <IonTitle color='light'>{language.editCategory}</IonTitle>
          <IonButtons slot='secondary'>
            <IonButton
              color='light'
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
          <IonListHeader>
            <IonLabel style={{ color: 'gray' }}>
              {language.universal_basicInformation}
            </IonLabel>
          </IonListHeader>
          <IonItem color='no'>
            <IonLabel position='floating'>
              {language.editCategory_name}
            </IonLabel>
            <IonInput
              value={state.name}
              onIonChange={(e) => {
                setState({ ...state, name: e.detail.value });
              }}
            ></IonInput>
          </IonItem>
          <IonItem color='no'>
            <IonLabel position='floating'>
              {language.editCategory_desc}
            </IonLabel>
            <IonTextarea
              value={state.desc}
              rows={6}
              onIonChange={(e) => {
                setState({ ...state, desc: e.detail.value });
              }}
            ></IonTextarea>
          </IonItem>
        </div>
        <br></br>
        <div>
          <IonListHeader>
            <IonLabel style={{ color: 'gray' }}>
              {language.universal_customization}
            </IonLabel>
          </IonListHeader>

          <CustomizeCategory
            initColor={state.iconColor}
            initType={state.iconType}
            onChangeColor={changeColor}
            onChangeType={changeType}
          />
        </div>
        <IonFab vertical='bottom' horizontal='center' slot='fixed'>
          <IonFabButton
            className='fab'
            onClick={() => {
              DataStore.editCategory(params.id, {
                title: state.name,
                desc: state.desc,
                id: params.id,
                iconColor: state.iconColor,
                iconType: state.iconType,
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

  function changeColor(e) {
    setState({
      ...state,
      iconColor: e,
    });
  }

  function changeType(e) {
    setState({
      ...state,
      iconType: e,
    });
  }

  function deleteCategoryDialog() {
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
            DataStore.deleteCategory(params.id);
            history.goBack();
          },
        },
      ],
    });
  }
};

export default observer(EditCategory);
