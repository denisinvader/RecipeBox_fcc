const React = require('react');
const ReactDOM = require('react-dom');

require('./styles.scss');

const RecipeBoxApp = require('./components/RecipeBoxApp/index');

ReactDOM.render(
  <RecipeBoxApp />,
  document.getElementById('app')
);
