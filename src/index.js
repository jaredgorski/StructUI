const React = require('react');
const FinderLayout = require('./FinderLayout');
const {getProcessedProps} = require('./util/finder-process');

const FinderApp = props => {
  return React.createElement(FinderLayout, getProcessedProps(props));
};

module.exports = FinderApp;
module.exports.default = FinderApp;
