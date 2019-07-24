
import aContainer from 'bundle-loader?lazy!./IndexPage';
import Bundle from './Bundle';

const A = (props) => (
  <Bundle load={aContainer}>
    {(Container) => <Container {...props}/>}
  </Bundle>
)
export default A;
