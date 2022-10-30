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
  IonItem,
  IonLabel,
  IonBackButton,
  IonInput,
  IonTextarea,
  useIonAlert,
  IonListHeader,
  IonSlides,
  IonSlide,
  IonTabBar,
  IonTabButton,
} from '@ionic/react';
import { saveSharp, trashSharp, informationCircle, colorPalette } from 'ionicons/icons';
import './styles.css';

import { observer } from 'mobx-react';
import CustomizeCategory from '../../components/customizer-category';
import { Iservice } from '../../interfaces/index';
import SzhInput from '../../components/szh-input/index';

const EditCategory = () => {
  const Service: Iservice = useContext(ServiceContext);
  const [presentAlert] = useIonAlert();
  const slider: any = useRef();

  const history = useHistory();
  const params = useParams<{ id?: string }>();

  const [state, setState] = useState({
    name: Service.data.getCategory(params.id)
      ? Service.data.getCategory(params.id).title
      : '',
    desc: Service.data.getCategory(params.id)
      ? Service.data.getCategory(params.id).desc
      : '',
    iconColor: Service.data.getCategory(params.id)
      ? Service.data.getCategory(params.id).iconColor
      : '',
    iconType: Service.data.getCategory(params.id)
      ? Service.data.getCategory(params.id).iconType
      : '',
    isFavorite: Service.data.getCategory(params.id)
      ? Service.data.getCategory(params.id).isFavorite
      : '',
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
    editCategory: () => {
      Service.data.editCategory(params.id, {
        title: state.name,
        desc: state.desc,
        id: params.id,
        iconColor: state.iconColor,
        iconType: state.iconType,
        isFavorite: state.isFavorite
      });
      history.goBack();
    }
  };

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton color='light' defaultHref='/' />
          </IonButtons>
          <IonTitle color='light'>{Service.language.editCategory}</IonTitle>
          <IonButtons slot='secondary'>
            <IonButton
              color='light'
              onClick={() => {
                deleteCategoryDialog();
              }}
            >
              <IonIcon slot='icon-only' icon={trashSharp} />
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
          onClick={callbacks.editCategory}
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
            Service.data.deleteCategory(params.id);
            history.goBack();
          },
        },
      ],
    });
  }
};

export default observer(EditCategory);
