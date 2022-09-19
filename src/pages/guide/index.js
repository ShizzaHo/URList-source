import { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { App } from '@capacitor/app';
import SettingsState from '../../store/settings';
import { observer } from 'mobx-react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonSlides,
  IonSlide,
  IonButton,
} from '@ionic/react';
import './styles.css';
import language from '../../language';

import guide_01 from '../../theme/guide/guide_01.gif';
import guide_02 from '../../theme/guide/guide_02.gif';
import guide_03 from '../../theme/guide/guide_03.gif';

const slideOpts = {
  initialSlide: 0,
  speed: 400,
};

const Guide = () => {
  const history = useHistory();

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/' />
          </IonButtons>
          <IonTitle>{language.guide}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSlides pager={true} options={slideOpts} className='guide-slider'>
          <IonSlide>
            <div className='p-10 guide-page'>
              <h1 className='guide-title'>{language.guide_slide1_title}</h1>
              <p className='guide-desc'>{language.guide_slide1_desc}</p>
              <img src={guide_01}></img>
            </div>
          </IonSlide>
          <IonSlide>
            <div className='p-10 guide-page'>
              <h1 className='guide-title'>{language.guide_slide2_title}</h1>
              <p className='guide-desc'>{language.guide_slide2_desc}</p>
              <img src={guide_02}></img>
            </div>
          </IonSlide>
          <IonSlide>
            <div className='p-10 guide-page'>
              <h1 className='guide-title'>{language.guide_slide3_title}</h1>
              <p className='guide-desc'>{language.guide_slide3_desc}</p>
              <img src={guide_03}></img>
            </div>
          </IonSlide>
          <IonSlide>
            <div className='p-10 guide-page'>
              <h1 className='guide-title'>{language.guide_slide4_title}</h1>
              <p className='guide-desc'>{language.guide_slide4_desc}</p>
              <IonButton color="dark" onClick={()=>{history.goBack()}}>{language.guide_slide4_button}</IonButton>
            </div>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default observer(Guide);
