import 'moment/locale/fr';
import moment from 'moment';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createGlobalStyle } from 'styled-components';

import { globalStyles } from './styles/global';

import App from './components/App';

moment.locale('fr');

// eslint-disable-next-line
const GlobalStyle = createGlobalStyle`${globalStyles}`;

/* eslint-disable no-undef */
render(
    <React.Fragment>
        <App />
        <GlobalStyle />
    </React.Fragment>,
    root
);

if (module.hot) {
    module.hot.accept(App, () => {
        render(
            <AppContainer>
                <App />
            </AppContainer>,
            root
        );
    });
}
