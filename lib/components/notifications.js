'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _kindTypes = require('../constants/kind-types');

var _notification = require('./notification');

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Notifications = function (_Component) {
    _inherits(Notifications, _Component);

    function Notifications(props) {
        _classCallCheck(this, Notifications);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Notifications).call(this, props));

        _this._getNotifs = function (store, nkey, kind) {
            var notifs = store[nkey];
            if (!notifs || !notifs.length) return [];
            var filteredNotifs = kind ? notifs.filter(function (notif) {
                return notif.type === kind;
            }) : notifs;
            if (!filteredNotifs || !filteredNotifs.length) return [];
            return filteredNotifs;
        };

        _this._getClassName = function (store, kind, className, isUseDefSettings) {
            if (isUseDefSettings && store.defSettings[kind] && store.defSettings[kind].className) {
                return [store.defSettings[kind].className, className].join(' ');
            }
            return className;
        };

        _this._getStyle = function (store, kind, style, isUseDefSettings) {
            if (isUseDefSettings && store.defSettings[kind] && store.defSettings[kind].style) {
                return Object.assign({}, store.defSettings[kind].style, style);
            }
            return style;
        };

        return _this;
    }

    _createClass(Notifications, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var nkey = _props.nkey;
            var className = _props.className;
            var style = _props.style;
            var kind = _props.kind;
            var isShowMessage = _props.isShowMessage;
            var isUseDefSettings = _props.isUseDefSettings;

            var _notifs = this._getNotifs(this.props.state, nkey, kind);
            var _className = this._getClassName(this.props.state, kind, className, isUseDefSettings);
            var _style = this._getStyle(this.props.state, kind, style, isUseDefSettings);

            if (!_notifs.length) return null;

            if (_notifs.length == 1) {
                return _react2.default.createElement(
                    _notification2.default,
                    {
                        key: _notifs[0].id,
                        className: _className,
                        style: _style,
                        message: isShowMessage ? _notifs[0].message : null
                    },
                    this.props.children
                );
            } else {
                return _react2.default.createElement(
                    'div',
                    null,
                    _notifs.map(function (notif) {
                        return _react2.default.createElement(
                            _notification2.default,
                            {
                                key: notif.id,
                                className: _className,
                                style: _style,
                                message: isShowMessage ? notif.message : null
                            },
                            _this2.props.children
                        );
                    })
                );
            }
        }
    }]);

    return Notifications;
}(_react.Component);

Notifications.propTypes = {
    nkey: _react.PropTypes.string,
    className: _react.PropTypes.string,
    style: _react.PropTypes.object,
    kind: _react.PropTypes.oneOf([_kindTypes.NOTIFICATION_ERROR, _kindTypes.NOTIFICATION_INFO, _kindTypes.NOTIFICATION_SUCCESS, _kindTypes.NOTIFICATION_WARNING]),
    isShowMessage: _react.PropTypes.bool,
    isUseDefSettings: _react.PropTypes.bool
};

Notifications.defaultProps = {
    nkey: null,
    className: null,
    style: {},
    kind: null,
    isShowMessage: true,
    isUseDefSettings: true
};

exports.default = (0, _reactRedux.connect)(function (state) {
    return {
        state: state.notifier
    };
})(Notifications);