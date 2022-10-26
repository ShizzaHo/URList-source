import { useState, useContext, useRef } from 'react';
import ServiceContext from '../../context/service-context';
import { useHistory, useParams } from 'react-router-dom';
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
  IonTabButton,
  IonSlide,
  IonSlides,
  IonTabBar,
} from '@ionic/react';
import {
  saveSharp,
  informationCircle,
  colorPalette,
} from 'ionicons/icons';
import './styles.css';

import { observer } from 'mobx-react';

import { generateCategoryID } from '../../utils/generator';
import { Iservice } from '../../interfaces';
import SzhInput from '../../components/szh-input';
import CustomizeLink from '../../components/customizer-link';

const NewLink = () => {
  const Service: Iservice = useContext(ServiceContext);
  const history = useHistory();
  const params = useParams<{ id?: string }>();
  const slider: any = useRef();

  const [state, setState] = useState({
    name: '',
    url: '',
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
    url: (e: any) => {
      setState({
        ...state,
        url: e.target.value,
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
    createCategory: () => {
      if (
        state.url.indexOf('https://') !== -1 ||
        state.url.indexOf('http://') !== -1
      ) {
        if (state.url.indexOf('.') !== -1) {
          Service.data.createNewLink({
            title: state.name,
            url: state.url,
            parentID: params.id,
            id: 'link_' + generateCategoryID(),
            iconColor: state.iconColor,
            iconType: state.iconType,
          });
          history.goBack();
        }
      } else {
        alert(
          Service.language.editLink_errorTitle +
            '\n' +
            Service.language.editLink_errorItem1 +
            '\n' +
            Service.language.editLink_errorItem2
        );
      }
    },
  };

  return (
    <IonPage id='new-link-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton color='light' defaultHref='/' />
          </IonButtons>
          <IonTitle color='light'>{Service.language.newLink}</IonTitle>
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
                id='url'
                value={state.url}
                placeholder={Service.language.newLink_url}
                onChange={handlers.url}
              />
            </div>
          </IonSlide>
          <IonSlide>
            <div className='p-10 newcategory-page'>
              <CustomizeLink
                initColor={state.iconColor}
                initType={state.iconType}
                onChangeColor={callbacks.changeColor}
                onChangeType={callbacks.changeType}
                linkName={state.name}
                service={Service}
                url={state.url}
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
        <IonFabButton className='fab' onClick={callbacks.createCategory}>
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
          <IonLabel>{Service.language.tabbar_basicInformation}</IonLabel>
        </IonTabButton>

        <IonTabButton tab='speakers' onClick={callbacks.openSlideTwo}>
          <IonIcon icon={colorPalette} />
          <IonLabel>{Service.language.tabbar_customization}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );

  function changeColor(e: string) {
    setState({
      ...state,
      iconColor: e,
    });
  }

  function changeType(e: string) {
    setState({
      ...state,
      iconType: e,
    });
  }
};

export default observer(NewLink);
