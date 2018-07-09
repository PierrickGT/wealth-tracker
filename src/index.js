import PropTypes from 'prop-types';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const About = () => (
    <div>
        <h2>About you</h2>
    </div>
);

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
);

const Topics = ({ match }) => (
    <div>
        <h2>
            <ul>
                <li>
                    <Link to={`${match.url}/rendering`}>
                        Rendering with React
                    </Link>
                </li>
                <li>
                    <Link to={`${match.url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>
                        Props v. State
                    </Link>
                </li>
            </ul>

            <Route path={`${match.url}/:topicId`} component={Topic} />
            <Route
                exact
                path={match.url}
                render={() => <h3>Please select a topic.</h3>}
            />
        </h2>
    </div>
);

const BasicExample = () => (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/topics">Topics</Link>
                </li>

                <hr />

                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/topics" component={Topics} />
            </ul>
        </div>
    </Router>
);

Topic.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            topicId: PropTypes.string
        })
    }).isRequired
};

Topics.propTypes = {
    match: PropTypes.shape({
        url: PropTypes.string
    }).isRequired
};

render(<BasicExample />, document.querySelector('#root'));
