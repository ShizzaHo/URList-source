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
  IonTextarea,
  IonThumbnail,
  IonImg
} from '@ionic/react';
import { saveSharp } from 'ionicons/icons';
import './styles.css';
import logo from '../../theme/logo.png'

import { observer } from 'mobx-react';

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
          <IonTitle>Пользовательское соглашение</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='p-20'>
          <div className='about-header'>
            <img src={logo}></img>
            <h1>URList</h1>
            <h2>Твой помощник в сохранении ссылок</h2>
          </div>
          <div className='about-footer'>
            <a onClick={()=>{window.open("https://www.donationalerts.com/r/hu_tao_goddess")}}>Поддержать проект</a>
            <a onClick={()=>{window.open("https://urlist.vercel.app")}}>Официальный сайт проекта</a>
            {/* <a>Тема приложения на 4PDA</a> */}
            <p>Разработчик: <a onClick={()=>{window.open("https://shizzaho-portfolio.vercel.app")}}>ShizzaHo</a></p>
            <p>Версия приложения: 1.0.0</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default observer(NewCategory);
