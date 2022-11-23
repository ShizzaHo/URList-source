import { useState, useContext } from 'react';
import ServiceContext from '../../context/service-context';
import { useHistory, useParams } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonFab,
  IonFabButton,
  IonLabel,
  IonBackButton,
} from '@ionic/react';
import { send } from 'ionicons/icons';
import './styles.css';

import { observer } from 'mobx-react';
import { Iservice } from '../../interfaces/index';

const NewLink = () => {
  const Service: Iservice = useContext(ServiceContext);
  const history = useHistory();
  const params = useParams<{ mode?: string }>();

  const [state, setState] = useState({
    data: params.mode == "exportData" ? Service.data.exportDataToJSON() : "",
  });

  return (
    <IonPage id='new-link-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton color='light' defaultHref='/' />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='p-10'>
          <textarea className='up-textarea' value={state.data} id="inputData" placeholder={Service.language.universalPage_inputPlaceholder}></textarea>
          <IonLabel position='floating'>{Service.language.universalPage_info2}</IonLabel>
        </div>
        <IonFab vertical='bottom' horizontal='center' slot='fixed'>
          <IonFabButton className='fab' onClick={functionSpec}>
            <IonIcon icon={send} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );

  function functionSpec(){
    const win: Window = window;
    if (params.mode === "importData") {
      Service.data.importFromJson(state.data)
      win.location = "/";
    } else if (params.mode === "exportData") {
      history.goBack();
    } else {
      history.goBack();
    }
  }
};

export default observer(NewLink);
