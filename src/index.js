const React = require('react');
const StructLayout = require('./StructLayout');
const {getProcessedProps} = require('./util/struct-process');

const StructApp = props => {
  return React.createElement(StructLayout, getProcessedProps(props));
};

module.exports = StructApp;
module.exports.default = StructApp;
