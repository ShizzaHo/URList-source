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
  IonImg,
  isPlatform 
} from '@ionic/react';
import { saveSharp } from 'ionicons/icons';
import './styles.css';
import logo from '../../theme/logo.png'
import config from '../../config';

import { observer } from 'mobx-react';
import language from '../../language';

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
            <IonBackButton color='light' defaultHref='/' />
          </IonButtons>
          <IonTitle color='light'>{language.about}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='p-20'>
          <div className='about-header'>
            <img src={logo}></img>
            <h1>URList</h1>
            <h2>{language.about_subtitle}</h2>
          </div>
          <div className='about-footer'>
            {isPlatform('android') ? <></> : <a onClick={()=>{window.open("https://www.donationalerts.com/r/hu_tao_goddess")}}>{language.about_donat}</a>}
            <a onClick={()=>{window.open("https://urlist.vercel.app")}}>{language.about_site}</a>
            <a onClick={()=>{window.open("https://4pda.to/forum/index.php?showtopic=1054931")}}>Тема приложения на 4PDA</a>
            <p>{language.about_developer} <a onClick={()=>{window.open("https://shizzaho-portfolio.vercel.app")}}>ShizzaHo</a></p>
            <p>{language.about_version} {config.thisVersion}</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default observer(NewCategory);
