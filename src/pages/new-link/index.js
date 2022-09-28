import { useState, useContext } from 'react';
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
  IonItem,
  IonLabel,
  IonBackButton,
  IonInput,
  IonListHeader,
} from '@ionic/react';
import { saveSharp } from 'ionicons/icons';
import './styles.css';
import CustomizeCategory from '../../components/customizer-link';

import { observer } from 'mobx-react';

import { generateCategoryID } from './../../utils/generator/index';
const NewLink = () => {
  const Service = useContext(ServiceContext);
  const history = useHistory();
  const params = useParams();

  const [state, setState] = useState({
    name: '',
    url: '',
    iconColor: 'gray',
    iconType: 'nothing',
  });

  const [error, setError] = useState(false);

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
        <div className='p-10'>
          <div>
            <IonListHeader>
              <IonLabel style={{ color: 'gray' }}>
                {Service.language.universal_basicInformation}
              </IonLabel>
            </IonListHeader>
            <IonItem color='no'>
              <IonLabel position='floating'>{Service.language.newLink_name}</IonLabel>
              <IonInput
                value={state.name}
                onIonChange={(e) => {
                  setState({ ...state, name: e.detail.value });
                }}
              ></IonInput>
            </IonItem>
            <IonItem color='no'>
              <IonLabel position='floating'>{Service.language.newLink_url}</IonLabel>
              <IonInput
                value={state.url}
                onIonChange={(e) => {
                  setState({ ...state, url: e.detail.value });
                }}
              ></IonInput>
            </IonItem>
            {error ? (
              <>
                <p style={{ color: 'red' }}>{Service.language.newLink_errorTitle}</p>
                <ul style={{ color: 'red' }}>
                  <li>{Service.language.newLink_errorItem1}</li>
                  <li>{Service.language.newLink_errorItem2}</li>
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

  function changeColor(e) {
    setState({
      ...state,
      iconColor: e,
    });
  }

  function changeType(e) {
    setState({
      ...state,
      iconType: e,
    });
  }

  function checkData() {
    if (
      state.url.indexOf('https://') !== -1 ||
      state.url.indexOf('http://') !== -1
    ) {
      if (state.url.indexOf('.') !== -1) {
        setError(false);
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
      setError(true);
    }
  }
};

export default observer(NewLink);
