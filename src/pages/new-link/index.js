import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Redirect, Route } from 'react-router-dom';
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
} from '@ionic/react';
import { saveSharp } from 'ionicons/icons';
import './styles.css';

import { observer } from 'mobx-react';
import DataStore from '../../store/data';

import { generateCategoryID } from './../../utils/generator/index';
import language from '../../language';

const NewLink = () => {
  const history = useHistory();
  const params = useParams();

  const [state, setState] = useState({
    name: '',
    url: '',
  });

  const [error, setError] = useState(false);

  return (
    <IonPage id='new-link-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/' />
          </IonButtons>
          <IonTitle>{language.newLink}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='p-10'>
          <IonItem color='no'>
            <IonLabel position='floating'>{language.newLink_name}</IonLabel>
            <IonInput
              value={state.name}
              onIonChange={(e) => {
                setState({ ...state, name: e.detail.value });
              }}
            ></IonInput>
          </IonItem>
          <IonItem color='no'>
            <IonLabel position='floating'>{language.newLink_url}</IonLabel>
            <IonInput
              value={state.url}
              onIonChange={(e) => {
                setState({ ...state, url: e.detail.value });
              }}
            ></IonInput>
          </IonItem>
          {error ? (
            <>
              <p style={{ color: 'red' }}>
                {language.newLink_errorTitle}
              </p>
              <ul style={{ color: 'red' }}>
                <li>{language.newLink_errorItem1}</li>
                <li>{language.newLink_errorItem2}</li>
              </ul>
            </>
          ) : (
            <></>
          )}
        </div>
        <IonFab vertical='bottom' horizontal='center' slot='fixed'>
          <IonFabButton className='fab' onClick={checkData}>
            <IonIcon icon={saveSharp} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );

  function checkData() {
    if (
      state.url.indexOf('https://') !== -1 ||
      state.url.indexOf('http://') !== -1
    ) {
      if (state.url.indexOf('.') !== -1) {
        setError(false);
        DataStore.createNewLink({
          title: state.name,
          url: state.url,
          parentID: params.id,
          id: "link_"+generateCategoryID()
        });
        history.goBack();
      }
    } else {
      setError(true);
    }
  }
};

export default observer(NewLink);
