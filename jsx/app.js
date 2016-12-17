'use strict';

import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Router } from 'react-native-router-flux';
import configure from './store/configure';
import routes from './routes';

const store = configure();
const RouterWithRedux = connect()(Router);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RouterWithRedux scenes={routes} />
            </Provider>
        );
    }
}

export default App;



