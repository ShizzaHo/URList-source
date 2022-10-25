import './styles.css';
import { Iany } from '../../interfaces/index';

function SettingsBlock({title, children}: Iany) {
  return (
    <div className='settingsblock'>
      <span className="settingsblock-title">{title}</span>
      {children}
    </div>
  );
}

SettingsBlock.defaultProps = {
  children: <></>
};

export default SettingsBlock;
