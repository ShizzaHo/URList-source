import { Iany } from '../../interfaces/index';

function Spacer({ height }: Iany) {

  return (
    <div style={{height: height}}></div>
  );
}

Spacer.defaultProps = {
  height: 56,
};

export default Spacer;
