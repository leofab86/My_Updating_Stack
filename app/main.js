console.log('MAIN.js Entry Point');

const ReactDOM = require('react-dom');
const { renderApp } = require('./app');

ReactDOM.render(renderApp(), document.getElementById('app'));
