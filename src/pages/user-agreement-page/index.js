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
  IonTextarea
} from '@ionic/react';
import { saveSharp } from 'ionicons/icons';
import './styles.css';

import { observer } from 'mobx-react';
import DataStore from '../../store/data';

const NewCategory = () => {
  const history = useHistory();

  const [state, setState] = useState({
    name: '',
    desc: '',
  });

  return (
    <IonPage id='category-page'>
      <IonHeader>
        <IonToolbar color='urlDarkToolbar'>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/' />
          </IonButtons>
          <IonTitle>Пользовательское соглашение</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='p-20'>
          <h1>Пользовательское Соглашение</h1>
          <p>Настоящее Пользовательское Соглашение (Далее Соглашение) регулирует отношения между владельцем https://url-kogn2efnn-shizzaho.vercel.app/ (далее URList или Администрация) с одной стороны и пользователем сайта с другой.
Сайт URList не является средством массовой информации.</p>
          <p>Используя сайт, Вы соглашаетесь с условиями данного соглашения.
          Если Вы не согласны с условиями данного соглашения, не используйте сайт URList!</p>
          <h1>Права и обязанности сторон</h1>
          <p>Пользователь имеет право:
          <br/>- получать информацию на сайте
          <br/>- создавать информацию для сайта
          <br/>- использовать информацию сайта в личных некоммерческих целях</p>
          <p>Администрация имеет право:
          <br/>- по своему усмотрению и необходимости создавать, изменять, отменять правила
          <br/>- ограничивать доступ к любой информации на сайте
          </p>
          <p>Пользователь обязуется:
          <br/>- не нарушать работоспособность сайта
          </p>
          <p>Администрация обязуется:</p>
          <h1>Ответственность сторон:</h1>
          <p>
          <br/>- пользователь лично несет полную ответственность за распространяемую им информацию
          <br/>- администрация не несет никакой ответственности за достоверность информации, скопированной из других источников
          <br/>- администрация не несёт ответственность за несовпадение ожидаемых Пользователем и реально полученных услуг
          <br/>- администрация не несет никакой ответственности за услуги, предоставляемые третьими лицами
          <br/>- в случае возникновения форс-мажорной ситуации (боевые действия, чрезвычайное положение, стихийное бедствие и т. д.) Администрация не гарантирует сохранность информации, размещённой Пользователем, а также бесперебойную работу информационного ресурса
          </p>
          <h1>Условия действия Соглашения</h1>
          <p>Данное Соглашение вступает в силу при любом использовании данного сайта.
Соглашение перестает действовать при появлении его новой версии.
Администрация оставляет за собой право в одностороннем порядке изменять данное соглашение по своему усмотрению.
Администрация не оповещает пользователей об изменении в Соглашении.</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default observer(NewCategory);
