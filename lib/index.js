'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require('./actions/actions');

var Actions = _interopRequireWildcard(_actions);

var _kindTypes = require('./constants/kind-types');

var Kinds = _interopRequireWildcard(_kindTypes);

var _notifications = require('./components/notifications');

var _notifications2 = _interopRequireDefault(_notifications);

var _reducer = require('./reducers/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var ReactReduxNotifier = _extends({}, Actions, {
    Actions: Actions
}, Kinds, {
    Kinds: Kinds,
    Reducer: _reducer2.default,
    Notifications: _notifications2.default
});

module.exports = ReactReduxNotifier;