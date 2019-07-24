
import bContainer from 'bundle-loader?lazy!./PageTwo';
import Bundle from './Bundle';


const B = (props) => (
  <Bundle load={bContainer}>
    {(Container) => <Container {...props}/>}
  </Bundle>
)
export default B;
