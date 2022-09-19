import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import Categories from './pages/category';
import Settings from './pages/settings';
import NewCategory from './pages/new-category';
import NewLink from './pages/new-link';
import OpenCategory from './pages/open-category';
import EditCategory from './pages/edit-category';
import EditLink from './pages/edit-link';
import ImportExportPage from './pages/import-export-page';
import UserAgreement from './pages/user-agreement-page';
import About from './pages/about-page';
import UniversalInputPage from './pages/universal-input-page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import DataStore from './store/data';
import SettingsState from './store/settings';

DataStore.loadDataFromLocalStorage();
SettingsState.loadSettingsFromLocalStorage();

if (localStorage.getItem("URLIST_LANG") == undefined) {
  const userLang = navigator.language || navigator.userLanguage; 
  if (userLang == "ru-RU") {
    localStorage.setItem("URLIST_LANG", "russian");
  } else if (userLang == "en-EN")  {
    localStorage.setItem("URLIST_LANG", "english");
  } else if (userLang == "zh_CN")  {
    localStorage.setItem("URLIST_LANG", "chinese");
  } else {
    localStorage.setItem("URLIST_LANG", "english");
  }
}

setupIonicReact();

const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path='/' exact={true}>
            <Categories />
          </Route>
          <Route path='/categories' exact={true}>
            <Categories />
          </Route>
          <Route path='/settings' exact={true}>
            <Settings />
          </Route>
          <Route path='/settings/importExport' exact={true}>
            <ImportExportPage />import Settings from './pages/settings/index';

          </Route>
          <Route path='/settings/userAgreement' exact={true}>
            <UserAgreement />
          </Route>
          <Route path='/settings/about' exact={true}>
            <About />
          </Route>
          <Route path='/newCategory' exact={true}>
            <NewCategory />
          </Route>
          <Route path='/openCategory/:id' exact={true}>
            <OpenCategory />
          </Route>
          <Route path='/openCategory/:id/new' exact={true}>
            <NewLink />
          </Route>
          <Route path='/editCategory/:id' exact={true}>
            <EditCategory />
          </Route>
          <Route path='/editLink/:id' exact={true}>
            <EditLink />
          </Route>

          <Route path='/universalInput/:mode' exact={true}>
            <UniversalInputPage />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
