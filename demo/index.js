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
                            <p>It's nested element.</p>
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
