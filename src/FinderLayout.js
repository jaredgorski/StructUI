const React = require('react');
const FinderPane = require('./FinderPane');

const FinderLayout = props => {
  return React.createElement('main', {className: 'finderui-main'},
    React.createElement('div', {className: 'finderui-frame'},
      React.createElement(FinderPane, props)
    )
  );
};

module.exports = FinderLayout;
module.exports.default = FinderLayout;
