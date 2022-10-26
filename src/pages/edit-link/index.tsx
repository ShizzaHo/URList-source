import { useState, useContext, useRef } from 'react';
import ServiceContext from '../../context/service-context';
import { useHistory, useParams } from 'react-router-dom';
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
  IonLabel,
  IonBackButton,
  useIonAlert,
  IonSlides,
  IonSlide,
  IonTabBar,
  IonTabButton,
} from '@ionic/react';
import { saveSharp, trashSharp, informationCircle, colorPalette } from 'ionicons/icons';
import './styles.css';

import { observer } from 'mobx-react';
import DataStore from '../../store/data';
import { Iservice } from '../../interfaces/index';
import SzhInput from '../../components/szh-input/index';
import CustomizeLink from '../../components/customizer-link/index';

const EditLink = () => {
  const Service: Iservice = useContext(ServiceContext);
  const [presentAlert] = useIonAlert();

  const history = useHistory();
  const params = useParams<{ id?: string }>();

  const [state, setState] = useState({
    name: Service.data.getLink(params.id)
      ? Service.data.getLink(params.id).title
      : '',
    url: Service.data.getLink(params.id) ? (DataStore.getLink(params.id) || {}).url : '',
    iconColor: Service.data.getLink(params.id)
      ? Service.data.getLink(params.id).iconColor
      : '',
    iconType: Service.data.getLink(params.id)
      ? Service.data.getLink(params.id).iconType
      : '',
    isFavorite: Service.data.getLink(params.id)
      ? Service.data.getLink(params.id).isFavorite
      : '',
  });

  const slider: any = useRef();

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
    editCategory: () => {
      if (
        state.url.indexOf('https://') !== -1 ||
        state.url.indexOf('http://') !== -1
      ) {
        if (state.url.indexOf('.') !== -1) {
          DataStore.editLink(params.id, {
            title: state.name,
            url: state.url,
            parentID: (DataStore.getLink(params.id) || {}).parentID,
            id: params.id,
            iconColor: state.iconColor,
            iconType: state.iconType,
            isFavorite: state.isFavorite
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
    <IonPage id='edit-link-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton color='light' defaultHref='/' />
          </IonButtons>
          <IonTitle color='light'>{Service.language.editLink}</IonTitle>
          <IonButtons slot='secondary'>
            <IonButton
              color='light'
              onClick={() => {
                deleteCategoryDialog();
              }}
            >
              <IonIcon color='light' slot='icon-only' icon={trashSharp} />
            </IonButton>
          </IonButtons>
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
        <IonFabButton className='fab' onClick={callbacks.editCategory}>
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

  function deleteCategoryDialog() {
    presentAlert({
      header: Service.language.editCategory_delete_title,
      message: Service.language.editCategory_delete_desc,
      buttons: [
        {
          text: Service.language.editCategory_delete_OK,
          role: 'cancel',
        },
        {
          text: Service.language.editCategory_delete_DELETE,
          role: 'confirm',
          handler: () => {
            Service.data.deleteLink(params.id);
            history.goBack();
          },
        },
      ],
    });
  }
};

export default observer(EditLink);
