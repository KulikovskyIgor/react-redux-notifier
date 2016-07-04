import * as Actions from './actions/actions';
import * as Kinds from './constants/kind-types';
import Notifications from './components/notifications';
import Reducer from './reducers/reducer';

const ReactReduxNotifier = {
    ...Actions,
    Actions,
    ...Kinds,
    Kinds,
    Reducer,
    Notifications
};

module.exports = ReactReduxNotifier;