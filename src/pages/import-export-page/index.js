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
          <IonTitle>Импорт и экспорт данных</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='p-20'>
          {/* <IonButton expand="block" className='buttonGray'>Экспортировать данные</IonButton> */}
          <IonButton expand="block" className='buttonGray' onClick={()=>{history.push("/universalInput/exportData")}}>Экспортировать данные в JSON</IonButton>
          <br />
          {/* <IonButton expand="block" className='buttonGray'>Импортировать данные</IonButton> */}
          <IonButton expand="block" className='buttonGray' onClick={()=>{history.push("/universalInput/importData")}}>Импортировать данные из JSON</IonButton>
          <div className='import-export-bottom-box'>
            <IonButton expand="block" className='buttonGray' onClick={()=>{window.open("https://shizzaho.notion.site/URList-47f2dd4cb6894b2489506d39f48e6a8b")}}>Инструкция</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default observer(NewCategory);
