import { useState, useContext } from 'react';
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
  useIonAlert,
  IonListHeader,
} from '@ionic/react';
import { saveSharp, trashSharp } from 'ionicons/icons';
import './styles.css';
import CustomizeCategory from '../../components/customizer-link';

import { observer } from 'mobx-react';
import DataStore from '../../store/data';
import { Iservice } from '../../interfaces/index';

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

  const [error, setError] = useState(false);

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
        <div className='p-10'>
          <div>
            <IonListHeader>
              <IonLabel style={{ color: 'gray' }}>
                {Service.language.universal_basicInformation}
              </IonLabel>
            </IonListHeader>
            <IonItem color='no'>
              <IonLabel position='floating'>{Service.language.editLink_name}</IonLabel>
              <IonInput
                value={state.name}
                onIonChange={(e) => {
                  setState({ ...state, name: e.detail.value });
                }}
              ></IonInput>
            </IonItem>
            <IonItem color='no'>
              <IonLabel position='floating'>{Service.language.editLink_url}</IonLabel>
              <IonInput
                value={state.url}
                onIonChange={(e) => {
                  setState({ ...state, url: (e.detail.value || "") });
                }}
              ></IonInput>
            </IonItem>
            {error ? (
              <>
                <p style={{ color: 'red' }}>{Service.language.editLink_errorTitle}</p>
                <ul style={{ color: 'red' }}>
                  <li>{Service.language.editLink_errorItem1}</li>
                  <li>{Service.language.editLink_errorItem2}</li>
                </ul>
              </>
            ) : (
              <></>
            )}
          </div>
          <br></br>
          <div>
            <IonListHeader>
              <IonLabel style={{ color: 'gray' }}>
                {Service.language.universal_customization}
              </IonLabel>
            </IonListHeader>
            <CustomizeCategory
              initColor={state.iconColor}
              initType={state.iconType}
              onChangeColor={changeColor}
              onChangeType={changeType}
            />
          </div>
        </div>
        <IonFab vertical='bottom' horizontal='center' slot='fixed'>
          <IonFabButton className='fab' onClick={checkData}>
            <IonIcon icon={saveSharp} />
          </IonFabButton>
        </IonFab>
      </IonContent>
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

  function checkData() {
    if (
      (state.url || "").indexOf('https://') !== -1 ||
      (state.url || "").indexOf('http://') !== -1
    ) {
      if ((state.url || "").indexOf('.') !== -1) {
        setError(false);
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
      setError(true);
    }
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
