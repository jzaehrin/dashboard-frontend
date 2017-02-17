import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

// import App from './components/App';
import Authenticate from './components/Authenticate';

injectTapEventPlugin();

ReactDom.render(<Authenticate />, document.getElementById('app'));
