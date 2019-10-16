const React = require('react');
const FinderLayout = require('./FinderLayout');

const FinderApp = props => {
  return React.createElement(FinderLayout, props);
};

module.exports = FinderApp;
module.exports.default = FinderApp;
