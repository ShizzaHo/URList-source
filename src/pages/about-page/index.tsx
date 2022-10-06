import { useContext } from 'react';
import ServiceContext from '../../context/service-context';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  isPlatform 
} from '@ionic/react';
import './styles.css';
import logo from '../../theme/logo.png'

import { observer } from 'mobx-react';
import { Iservice } from '../../interfaces/index';

const NewCategory = () => {
  const Service: Iservice = useContext(ServiceContext);

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton color='light' defaultHref='/' />
          </IonButtons>
          <IonTitle color='light'>{Service.language.about}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='p-20'>
          <div className='about-header'>
            <img src={logo}></img>
            <h1>URList</h1>
            <h2>{Service.language.about_subtitle}</h2>
          </div>
          <div className='about-footer'>
            {isPlatform('android') ? <></> : <a onClick={()=>{window.open("https://www.donationalerts.com/r/hu_tao_goddess")}}>{Service.language.about_donat}</a>}
            <a onClick={()=>{window.open("https://urlist.vercel.app")}}>{Service.language.about_site}</a>
            <a onClick={()=>{window.open("https://4pda.to/forum/index.php?showtopic=1054931")}}>Тема приложения на 4PDA</a>
            <p>{Service.language.about_developer} <a onClick={()=>{window.open("https://shizzaho-portfolio.vercel.app")}}>ShizzaHo</a></p>
            <p>{Service.language.about_version} {Service.config.thisVersion}</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default observer(NewCategory);
