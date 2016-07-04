import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Notification extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { className, style, message } = this.props;
        return (
            <div
                className={className}
                style={style}
                >
                {message}
                {this.props.children}
            </div>
        );
    }
}

Notification.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    message: PropTypes.string
}

Notification.defaultProps = {
    className: null,
    style: {},
    message: null
}