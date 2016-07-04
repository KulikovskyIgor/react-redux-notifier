# react-redux-notifier

React-redux-notifier helps you show your own notification and customize them.

### Installation

To install the stable version:

```
npm install --save react-redux-notifier
```

### Add notifier to your project.

Add add Reducer to combineReducers function:

```js
import { combineReducers } from 'redux';
import { Reducer } from 'react-redux-notifier';

export default combineReducers({
    notifier: Reducer
})
```

Add Notifications to Component:

```js
import React, { Component } from 'react';
import { Notifications } from 'react-redux-notifier';

export default class Demo extends Component {
    render () {
        return ( <Notifications nKey="some.key" /> );
    }
}
```

### Create and delete Notifications.

There are four kinds of notifications: 

1. NOTIFICATION_INFO
2. NOTIFICATION_SUCCESS
3. NOTIFICATION_WARNING
4. NOTIFICATION_ERROR

And actions for create them:

1. ADD_INFO(key, message, options)
2. ADD_SUCCESS(key, message, options)
3. ADD_WARNING(key, message, options)
4. ADD_ERROR(key, message, options)

Also you can clear notification store:

1. CLEAR_BY_KEY(key) - delete notification by key
2. CLEAR()           - clean the whole notifications store

Create and delete the notification:

```js
export default class Demo extends Component {
    componentWillMount() { 
        this.props.dispatch(ADD_INFO("demo.key", "It's info notification."));
        this.props.dispatch(CLEAR_BY_KEY("demo.key"));
    }
}
```

Also, you can specify OPTIONS like "hideAfter | ha" and "showAfter | sa":

```js
    this.props.dispatch(ADD_SUCCESS("demo.key.ha", "It's third info notification that will disappear after 3 seconds.", {ha: 3000}));
    this.props.dispatch(ADD_WARNING("demo.key.sa", "It's third info notification that appear after 3 seconds.", {sa: 3000}));
```

### Customization.

Set global settings for each kind of notification:

```js
import { Actions, Kinds } from '../src/index.js';
const CUSTOMIZE = Actions.CUSTOMIZE;
// or
import { CUSTOMIZE } from '../src/index.js';

export default class Demo extends Component {
    componentWillMount() { 
        this.props.dispatch(CUSTOMIZE({
            kind: Kinds.NOTIFICATION_INFO,
            className: "alert alert-info",
            style: {'fontSize': '18px'}
        }));
    }
}
```

You can set global "className" and "style" for particular kind of notifications.

### Notification Component.

Notification Component has several props like:

1. nkey - that's key that you specify when to create an action.
2. kind - that's a type of notification.
3. style - style for notification.
4. className - classes for notification.
5. isUseDefSettings - specify if a component must use global settings (default = true).
6. isShowMessage - specify if a component must show a message that you specify when to create an action (default = true).

```js
    <Notifications nkey="demo.key"
        kind={Kinds.NOTIFICATION_ERROR}
        style={{background: 'red'}}
        className="error"
        isUseDefSettings={false}/>
```

Nested components:

```js
    <Notifications nkey="demo.key"
        kind={Kinds.NOTIFICATION_INFO}
        isShowMessage={false}
        >
            <p>It is nested element.</p>
        </Notifications>
```

### Full example.

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, compose, bindActionCreators, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
    Row,
    Col,
    Navbar
} from 'react-bootstrap';
import {
    Notifications,
    Reducer,
    Actions,
    Kinds
} from '../src/index.js';

/* ***** DEMO COMPONENT ***** */

class Demo extends Component {
    constructor() {
        super()
    }

    componentWillMount() {

        this.props.actions.CUSTOMIZE({
            kind: Kinds.NOTIFICATION_ERROR,
            className: "alert alert-danger",
            style: {'fontSize': '18px'}
        });
        this.props.actions.CUSTOMIZE({
            kind: Kinds.NOTIFICATION_SUCCESS,
            className: "alert alert-success"
        });
        this.props.actions.CUSTOMIZE({
            kind: Kinds.NOTIFICATION_INFO,
            className: "alert alert-info"
        });
        this.props.actions.CUSTOMIZE({
            kind: Kinds.NOTIFICATION_WARNING,
            className: "alert alert-warning"
        });

        this.props.actions.ADD_INFO("demo.key", "It's info notification.");
        this.props.actions.ADD_ERROR("demo.key", "It's second info notification.");
        this.props.actions.ADD_SUCCESS("demo.key.ha", "It's third info notification that will disappear after 3 seconds.", {ha: 3000});
        this.props.actions.ADD_WARNING("demo.key.sa", "It's third info notification that appear after 3 seconds.", {sa: 3000});
    }

    render() {
        return (
            <div className="container">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            React Redux Notifier
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                </Navbar>
                <Row>
                    <Col xs={12}>
                        <Notifications nkey="demo.key"
                                       kind={Kinds.NOTIFICATION_INFO}>
                            <p>It is nested element.</p>
                        </Notifications>
                        <Notifications nkey="demo.key"
                                       kind={Kinds.NOTIFICATION_ERROR}
                                       style={{background: 'red'}}
                                       className="super"
                                       isUseDefSettings={true}/>
                        <Notifications nkey="demo.key.ha"
                                       kind={Kinds.NOTIFICATION_SUCCESS}/>
                        <Notifications nkey="demo.key.sa"
                                       kind={Kinds.NOTIFICATION_WARNING}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(store, props) {
    return {notifier: store.notifier};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(Actions, dispatch)};
}

const DemoDecorated = connect(mapStateToProps, mapDispatchToProps)(Demo);

/* ***** STORE ***** */

const createStoreWithMiddleware = compose(
    applyMiddleware(thunk)
)(createStore);

const store = createStoreWithMiddleware(combineReducers({
    notifier: Reducer
}));

/* ***** RENDER ***** */

ReactDOM.render(
    <Provider store={store}>
        <DemoDecorated />
    </Provider>,
    document.getElementById('demo')
)

```