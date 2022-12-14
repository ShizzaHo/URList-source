import { useContext } from 'react';
import ServiceContext from '../../context/service-context';
import { useHistory } from 'react-router-dom';
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

import guide_01 from '../../theme/guide/guide_01.gif';
import guide_02 from '../../theme/guide/guide_02.gif';
import guide_03 from '../../theme/guide/guide_03.gif';
import { Iservice } from '../../interfaces/index';

const slideOpts = {
  initialSlide: 0,
  speed: 400,
};

const Guide = () => {
  const Service: Iservice = useContext(ServiceContext);
  const history = useHistory();

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton color='light' defaultHref='/' />
          </IonButtons>
          <IonTitle color='light'>{Service.language.guide}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSlides pager={true} options={slideOpts} className='guide-slider'>
          <IonSlide>
            <div className='p-10 guide-page'>
              <h1 className='guide-title'>{Service.language.guide_slide1_title}</h1>
              <p className='guide-desc'>{Service.language.guide_slide1_desc}</p>
              <img src={guide_01}></img>
            </div>
          </IonSlide>
          <IonSlide>
            <div className='p-10 guide-page'>
              <h1 className='guide-title'>{Service.language.guide_slide2_title}</h1>
              <p className='guide-desc'>{Service.language.guide_slide2_desc}</p>
              <img src={guide_02}></img>
            </div>
          </IonSlide>
          <IonSlide>
            <div className='p-10 guide-page'>
              <h1 className='guide-title'>{Service.language.guide_slide3_title}</h1>
              <p className='guide-desc'>{Service.language.guide_slide3_desc}</p>
              <img src={guide_03}></img>
            </div>
          </IonSlide>
          <IonSlide>
            <div className='p-10 guide-page'>
              <h1 className='guide-title'>{Service.language.guide_slide4_title}</h1>
              <p className='guide-desc'>{Service.language.guide_slide4_desc}</p>
              <IonButton color="dark" onClick={()=>{history.goBack()}}>{Service.language.guide_slide4_button}</IonButton>
            </div>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default observer(Guide);
