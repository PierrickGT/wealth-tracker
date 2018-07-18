import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './components/App';

render(<App />, root);

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
