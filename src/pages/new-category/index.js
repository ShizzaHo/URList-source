import { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  IonRadioGroup,
  IonRadio,
  IonListHeader,
  IonList,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { saveSharp } from 'ionicons/icons';
import './styles.css';
import IconColorPicker from './../../components/icon-color-picker/index';

import { observer } from 'mobx-react';
import DataStore from '../../store/data';

import { generateCategoryID } from './../../utils/generator/index';
import language from '../../language';
import CustomizeCategory from '../../components/customizer-category/index';

const NewCategory = () => {
  const history = useHistory();

  const [state, setState] = useState({
    name: '',
    desc: '',
    iconColor: '#808080',
    iconType: 'nothing'
  });

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton color='light' defaultHref='/' />
          </IonButtons>
          <IonTitle color='light'>{language.newCategory}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='p-10'>
          <div>
            <IonListHeader>
              <IonLabel style={{ color: 'gray' }}>{language.universal_basicInformation}</IonLabel>
            </IonListHeader>

            <IonItem color='no'>
              <IonLabel position='floating'>
                {language.newCategory_name}
              </IonLabel>
              <IonInput
                value={state.name}
                onIonChange={(e) => {
                  setState({ ...state, name: e.detail.value });
                }}
              ></IonInput>
            </IonItem>
            <IonItem color='no'>
              <IonLabel position='floating'>
                {language.newCategory_desc}
              </IonLabel>
              <IonTextarea
                value={state.desc}
                rows={6}
                onIonChange={(e) => {
                  setState({ ...state, desc: e.detail.value });
                }}
              ></IonTextarea>
            </IonItem>
          </div>
          <br></br>
          <div>
            <IonListHeader>
              <IonLabel style={{ color: 'gray' }}>{language.universal_customization}</IonLabel>
            </IonListHeader>

            <CustomizeCategory initColor={state.iconColor} initType={state.iconType} onChangeColor={changeColor} onChangeType={changeType}/>
          </div>
        </div>
        <IonFab vertical='bottom' horizontal='center' slot='fixed'>
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
      </IonContent>
    </IonPage>
  );

  function changeColor(e) {
    setState({
      ...state,
      iconColor: e
    })
  }

  function changeType(e) {
    setState({
      ...state,
      iconType: e
    })
  }
};

export default observer(NewCategory);
