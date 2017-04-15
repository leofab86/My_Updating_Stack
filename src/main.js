console.log('MAIN.js Entry Point');

window.CONFIG = {...window.CONFIG, ...require('../config').clientConfig};

const ReactDOM = require('react-dom');
const { renderApp } = require('./app');

ReactDOM.render(renderApp(), document.getElementById('app'));
