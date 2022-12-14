import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
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
import Search from './pages/search';

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
import Guide from './pages/guide';
import CustomLanguage from './pages/custom-language';

DataStore.loadDataFromLocalStorage();
SettingsState.loadSettingsFromLocalStorage();

if (localStorage.getItem('URLIST_LANG') == undefined) {
  const userLang = navigator.language;
  switch (userLang) {
    case 'ru-RU':
      localStorage.setItem('URLIST_LANG', 'russian');
      break;
    case 'en-EN':
      localStorage.setItem('URLIST_LANG', 'english');
      break;
    case 'zh-CN':
      localStorage.setItem('URLIST_LANG', 'chinese');
      break;
    default:
      localStorage.setItem('URLIST_LANG', 'english');
      break;
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
            <ImportExportPage />
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
          <Route path='/search' exact={true}>
            <Search />
          </Route>

          <Route path='/guide' exact={true}>
            <Guide />
          </Route>
          <Route path='/universalInput/:mode' exact={true}>
            <UniversalInputPage />
          </Route>
          <Route path='/customLanguage' exact={true}>
            <CustomLanguage />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
