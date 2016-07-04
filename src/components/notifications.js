import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
    NOTIFICATION_ERROR,
    NOTIFICATION_INFO,
    NOTIFICATION_SUCCESS,
    NOTIFICATION_WARNING
} from '../constants/kind-types';
import Notification from './notification';

class Notifications extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { nkey, className, style, kind, isShowMessage, isUseDefSettings } = this.props;
        const _notifs = this._getNotifs(this.props.state, nkey, kind);
        const _className = this._getClassName(this.props.state, kind, className, isUseDefSettings);
        const _style = this._getStyle(this.props.state, kind, style, isUseDefSettings);

        console.log(this.props);

        if (!_notifs.length) return null;

        if (_notifs.length == 1) {
            return (
                <Notification
                    key={_notifs[0].id}
                    className={_className}
                    style={_style}
                    message={isShowMessage ? _notifs[0].message : null}
                    >
                    {this.props.children}
                </Notification>
            );
        } else {
            return (
                <div>
                     {_notifs.map((notif) => {
                         return (
                             <Notification
                                 key={notif.id}
                                 className={_className}
                                 style={_style}
                                 message={isShowMessage ? notif.message : null}
                                 >
                                 {this.props.children}
                             </Notification>
                         );
                     })}
                </div>
            );
        }
    }

    _getNotifs = (store, nkey, kind) => {
        const notifs = store[nkey];
        if (!notifs || !notifs.length) return [];
        const filteredNotifs = kind ? notifs.filter(notif => notif.type === kind) : notifs;
        if (!filteredNotifs || !filteredNotifs.length) return [];
        return filteredNotifs;
    }

    _getClassName = (store, kind, className, isUseDefSettings) => {
        if (isUseDefSettings && store.defSettings[kind] && store.defSettings[kind].className) {
            return [store.defSettings[kind].className, className].join(' ');
        }
        return className;
    }

    _getStyle = (store, kind, style, isUseDefSettings) => {
        if (isUseDefSettings && store.defSettings[kind] && store.defSettings[kind].style) {
            return Object.assign({}, store.defSettings[kind].style, style);
        }
        return style;
    }
}

Notifications.propTypes = {
    nkey: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    kind: PropTypes.oneOf([
        NOTIFICATION_ERROR,
        NOTIFICATION_INFO,
        NOTIFICATION_SUCCESS,
        NOTIFICATION_WARNING
    ]),
    isShowMessage: PropTypes.bool,
    isUseDefSettings: PropTypes.bool
};

Notifications.defaultProps = {
    nkey: null,
    className: null,
    style: {},
    kind: null,
    isShowMessage: true,
    isUseDefSettings: true
};

export default connect(state => {
    return {
        state: state.notifier
    };
})(Notifications);

