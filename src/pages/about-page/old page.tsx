import { useContext, useState } from 'react';
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
import TitleTop from '../../components/title-top/index';
import AboutHeader from '../../components/about/index';

const NewCategory = () => {
  const Service: Iservice = useContext(ServiceContext);
  const [scrollLevel, setScrollLevel] = useState(0);

  const callbacks = {
    setScrollLevel: (e: any) => {      
      setScrollLevel(e.target.detail.currentY);
    }
  }

  return (
    <IonPage id='category-page'>
      <AboutHeader service={Service} animationMode={true} animationScrollLevel={scrollLevel}/>
      <IonContent fullscreen scrollEvents={true} onIonScroll={callbacks.setScrollLevel}>
        <TitleTop>{Service.language.about}</TitleTop>
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
