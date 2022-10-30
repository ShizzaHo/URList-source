import { useContext, useEffect, useState } from 'react';
import ServiceContext from '../../context/service-context';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import {
  IonContent,
  IonPage,
  IonSpinner,
  IonCardSubtitle,
} from '@ionic/react';
import './styles.css';

import { Iservice } from '../../interfaces/index';
import { isPlatform } from '@ionic/core';
import { importTranslate } from './module/importer';

const CustomLanguage = () => {
  const Service: Iservice = useContext(ServiceContext);
  const history = useHistory();

  const [status, setStatus] = useState(Service.language.customLanguage_cheсking) //Service.language.customLanguage_wait

  const callbacks = {
    
  };

  useEffect(()=>{
    checkPlatform()
  }, [])

  return (
    <IonPage id='category-page'>
      <IonContent fullscreen>
        <div className='customlanguage_center'>
          <IonSpinner name="crescent" />
          <IonCardSubtitle>{status}</IonCardSubtitle>
        </div>
      </IonContent>
    </IonPage>
  );
  
  function checkPlatform() {
    if (isPlatform('android')) {
      fileWait()
    } else {
      const win: Window = window;
      const json = prompt(Service.language.customLanguage_prompt);
      localStorage.setItem('URLIST_CUSTOMLANG', json);
      win.location = '/';
    }
  }

  async function fileWait() {
    const win: Window = window;

    setStatus(Service.language.customLanguage_wait);
    const data = await importTranslate();
    if (data === false) {
      alert(Service.language.customLanguage_error);
      localStorage.setItem('URLIST_LANG', 'english');
      localStorage.setItem('URLIST_CUSTOMLANG', undefined);
      win.location = '/';
    } else {
      localStorage.setItem('URLIST_CUSTOMLANG', data.toString());
      win.location = '/';
    }
  }
};

export default observer(CustomLanguage);
