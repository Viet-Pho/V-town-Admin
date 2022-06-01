import {compose} from 'redux';
import withLayout from './withLayout';
import withData from './withData';
import withPermission from './withPermission';

export default compose(withData, withLayout, withPermission);
