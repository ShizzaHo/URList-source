import './styles.css';
import { Iany } from '../../interfaces/index';
import { IonBackButton } from '@ionic/react';

function TitleTop({children}: Iany) {
  return (
    <div className='titletop'>
      <div className='titletop-backpanel'>
        <IonBackButton color='light' defaultHref='/' />
      </div>
      <h1 className='titletop-title'>{children}</h1>
    </div>
  );
}

TitleTop.defaultProps = {
  children: <></>
};

export default TitleTop;
