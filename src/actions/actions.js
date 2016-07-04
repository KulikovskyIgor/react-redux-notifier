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

export function ADD_INFO(key, message, options) {
    return (dispatch, getState) => {
        apply(NOTIFICATION_INFO, key, message, options, dispatch, getState);
    }
}

export function ADD_WARNING(key, message, options) {
    return (dispatch, getState) => {
        apply(NOTIFICATION_WARNING, key, message, options, dispatch, getState);
    }
}

export function ADD_ERROR(key, message, options) {
    return (dispatch, getState) => {
        apply(NOTIFICATION_ERROR, key, message, options, dispatch, getState);
    }
}

export function ADD_SUCCESS(key, message, options) {
    return (dispatch, getState) => {
        apply(NOTIFICATION_SUCCESS, key, message, options, dispatch, getState);
    }
}

export function ADD(type, key, message) {
    return {
        id: Date.now(),
        type,
        key,
        message
    }
}

export function CUSTOMIZE({kind, className, style}) {
    let cust = {
        type: NOTIFICATION_CUSTOMIZE,
        kind
    };
    if (className) cust.className = className;
    if (style) cust.style = style;
    return cust;
}

export function CLEAR_BY_KEY(key) {
    return {
        type: NOTIFICATION_CLEAR_BY_KEY,
        key
    }
}

export function CLEAR() {
    return {
        type: NOTIFICATION_CLEAR
    }
}

const apply = (type, key, message, options, dispatch, getState) => {
    if (options) {
        if (options.hideAfter || options.ha) {
            dispatch(ADD(type, key, message));
            setTimeout(() => dispatch(CLEAR_BY_KEY(key)), options.hideAfter || options.ha)
        }
        if (options.showAfter || options.sa) setTimeout(() => dispatch(ADD(type, key, message)), options.showAfter || options.sa);
    } else {
        dispatch(ADD(type, key, message));
    }
}