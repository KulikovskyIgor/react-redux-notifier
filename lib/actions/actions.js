'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ADD_INFO = ADD_INFO;
exports.ADD_WARNING = ADD_WARNING;
exports.ADD_ERROR = ADD_ERROR;
exports.ADD_SUCCESS = ADD_SUCCESS;
exports.ADD = ADD;
exports.CUSTOMIZE = CUSTOMIZE;
exports.CLEAR_BY_KEY = CLEAR_BY_KEY;
exports.CLEAR = CLEAR;

var _actionTypes = require('../constants/action-types');

var _kindTypes = require('../constants/kind-types');

function ADD_INFO(key, message, options) {
    return function (dispatch, getState) {
        apply(_kindTypes.NOTIFICATION_INFO, key, message, options, dispatch, getState);
    };
}

function ADD_WARNING(key, message, options) {
    return function (dispatch, getState) {
        apply(_kindTypes.NOTIFICATION_WARNING, key, message, options, dispatch, getState);
    };
}

function ADD_ERROR(key, message, options) {
    return function (dispatch, getState) {
        apply(_kindTypes.NOTIFICATION_ERROR, key, message, options, dispatch, getState);
    };
}

function ADD_SUCCESS(key, message, options) {
    return function (dispatch, getState) {
        apply(_kindTypes.NOTIFICATION_SUCCESS, key, message, options, dispatch, getState);
    };
}

function ADD(type, key, message) {
    return {
        id: Date.now(),
        type: type,
        key: key,
        message: message
    };
}

function CUSTOMIZE(_ref) {
    var kind = _ref.kind;
    var className = _ref.className;
    var style = _ref.style;

    var cust = {
        type: _actionTypes.NOTIFICATION_CUSTOMIZE,
        kind: kind
    };
    if (className) cust.className = className;
    if (style) cust.style = style;
    return cust;
}

function CLEAR_BY_KEY(key) {
    return {
        type: _actionTypes.NOTIFICATION_CLEAR_BY_KEY,
        key: key
    };
}

function CLEAR() {
    return {
        type: _actionTypes.NOTIFICATION_CLEAR
    };
}

var apply = function apply(type, key, message, options, dispatch, getState) {
    if (options) {
        if (options.hideAfter || options.ha) {
            dispatch(ADD(type, key, message));
            setTimeout(function () {
                return dispatch(CLEAR_BY_KEY(key));
            }, options.hideAfter || options.ha);
        }
        if (options.showAfter || options.sa) setTimeout(function () {
            return dispatch(ADD(type, key, message));
        }, options.showAfter || options.sa);
    } else {
        dispatch(ADD(type, key, message));
    }
};