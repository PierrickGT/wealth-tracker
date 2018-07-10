import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

function renderApp() {
    render(<App />, root);
}

renderApp();

module.hot.accept(renderApp);
