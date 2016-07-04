import {
    NOTIFICATION_CUSTOMIZE,
    NOTIFICATION_CLEAR_BY_KEY,
    NOTIFICATION_CLEAR
} from '../constants/action-types';
import {
    NOTIFICATION_SUCCESS,
    NOTIFICATION_INFO,
    NOTIFICATION_WARNING,
    NOTIFICATION_ERROR,
} from '../constants/kind-types';

const defState = {
    defSettings: {}
};

export default function Reducer(state = defState, action) {
    switch (action.type) {
        case NOTIFICATION_SUCCESS:
            return getNewState(state, action);
        case NOTIFICATION_INFO:
            return getNewState(state, action);
        case NOTIFICATION_WARNING:
            return getNewState(state, action);
        case NOTIFICATION_ERROR:
            return getNewState(state, action);
        case NOTIFICATION_CLEAR_BY_KEY:
            let newState = {};
            for(let stateKey in state){
                if(stateKey.indexOf(action.key) !== 0) newState[stateKey] = state[stateKey]
            }
            return newState;
        case NOTIFICATION_CUSTOMIZE:
            return Object.assign({}, state, {
                defSettings: Object.assign({}, state.defSettings, {
                    [action.kind]: action
                })
            });
        case NOTIFICATION_CLEAR:
            return defState;
        default:
            return state;
    }
}

const getNewState = (state, action) => {
    return Object.assign({}, state, {
        [action.key]: state[action.key] ? [...state[action.key], action] : [action]
    });
};