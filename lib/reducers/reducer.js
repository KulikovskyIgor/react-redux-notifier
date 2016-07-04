'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Reducer;

var _actionTypes = require('../constants/action-types');

var _kindTypes = require('../constants/kind-types');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defState = {
    defSettings: {}
};

function Reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? defState : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case _kindTypes.NOTIFICATION_SUCCESS:
            return getNewState(state, action);
        case _kindTypes.NOTIFICATION_INFO:
            return getNewState(state, action);
        case _kindTypes.NOTIFICATION_WARNING:
            return getNewState(state, action);
        case _kindTypes.NOTIFICATION_ERROR:
            return getNewState(state, action);
        case _actionTypes.NOTIFICATION_CLEAR_BY_KEY:
            var newState = {};
            for (var stateKey in state) {
                if (stateKey.indexOf(action.key) !== 0) newState[stateKey] = state[stateKey];
            }
            return newState;
        case _actionTypes.NOTIFICATION_CUSTOMIZE:
            return Object.assign({}, state, {
                defSettings: Object.assign({}, state.defSettings, _defineProperty({}, action.kind, action))
            });
        case _actionTypes.NOTIFICATION_CLEAR:
            return defState;
        default:
            return state;
    }
}

var getNewState = function getNewState(state, action) {
    return Object.assign({}, state, _defineProperty({}, action.key, state[action.key] ? [].concat(_toConsumableArray(state[action.key]), [action]) : [action]));
};