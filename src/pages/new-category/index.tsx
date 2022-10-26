import { useState, useContext, useRef } from 'react';
import ServiceContext from '../../context/service-context';
import { useHistory } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonFab,
  IonFabButton,
  IonLabel,
  IonBackButton,
  IonSlides,
  IonSlide,
  IonTabBar,
  IonTabButton,
} from '@ionic/react';
import { saveSharp, informationCircle, colorPalette } from 'ionicons/icons';
import './styles.css';

import { observer } from 'mobx-react';
import DataStore from '../../store/data';

import { generateCategoryID } from '../../utils/generator/index';
import CustomizeCategory from '../../components/customizer-category/index';
import { Iservice } from '../../interfaces/index';
import SzhInput from '../../components/szh-input/index';

const NewCategory = () => {
  const Service: Iservice = useContext(ServiceContext);
  const history = useHistory();
  const slider: any = useRef();

  const [state, setState] = useState({
    name: '',
    desc: '',
    iconColor: '#808080',
    iconType: 'nothing',
  });

  const handlers = {
    name: (e: any) => {
      setState({
        ...state,
        name: e.target.value,
      });
    },
    desc: (e: any) => {
      setState({
        ...state,
        desc: e.target.value,
      });
    },
  };

  const callbacks = {
    changeColor: (e: string) => {
      setState({
        ...state,
        iconColor: e,
      });
    },
    changeType: (e: string) => {
      setState({
        ...state,
        iconType: e,
      });
    },
    openSlideOne: () => {
      console.log(slider.current.slideTo(0));
    },
    openSlideTwo: () => {
      console.log(slider.current.slideTo(1));
    },
  };

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton color='light' defaultHref='/' />
          </IonButtons>
          <IonTitle color='light'>{Service.language.newCategory}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSlides className='newcategory-slider' ref={slider}>
          <IonSlide>
            <div className='p-10 newcategory-page'>
              <SzhInput
                id='name'
                value={state.name}
                placeholder={Service.language.newCategory_name}
                onChange={handlers.name}
              />
              <SzhInput
                id='desc'
                value={state.desc}
                placeholder={Service.language.newCategory_desc}
                onChange={handlers.desc}
              />
            </div>
          </IonSlide>
          <IonSlide>
            <div className='p-10 newcategory-page'>
              <CustomizeCategory
                initColor={state.iconColor}
                initType={state.iconType}
                onChangeColor={callbacks.changeColor}
                onChangeType={callbacks.changeType}
                categoryName={state.name}
              />
            </div>
          </IonSlide>
        </IonSlides>
      </IonContent>
      <IonFab
        vertical='bottom'
        horizontal='center'
        slot='fixed'
        className='newcategory-fab'
      >
        <IonFabButton
          className='fab'
          onClick={() => {
            DataStore.createNewCategory({
              title: state.name,
              desc: state.desc,
              iconColor: state.iconColor,
              iconType: state.iconType,
              id: 'category_' + generateCategoryID(),
            });
            history.goBack();
          }}
        >
          <IonIcon icon={saveSharp} />
        </IonFabButton>
      </IonFab>
      <IonTabBar
        slot='bottom'
        color='urlDarkToolbar'
        className='newcategory-tabbar'
      >
        <IonTabButton tab='schedule' onClick={callbacks.openSlideOne}>
          <IonIcon icon={informationCircle} />
          <IonLabel>Базовая информация</IonLabel>
        </IonTabButton>

        <IonTabButton tab='speakers' onClick={callbacks.openSlideTwo}>
          <IonIcon icon={colorPalette} />
          <IonLabel>Кастомизация</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );
};

export default observer(NewCategory);
