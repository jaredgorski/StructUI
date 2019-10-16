const React = require('react');

const FinderDisplay = ({nodes, openNode}) => {
  const toggleNodelist = () => {
    const nodelistEls = typeof window !== undefined ? document.querySelectorAll('.finderui-nodelist') : [];

    if (nodelistEls.length) {
      if (nodelistEls[0].classList.contains('nodelist-closed')) {
        nodelistEls.forEach(el => el.classList.remove('nodelist-closed'));
      } else {
        nodelistEls.forEach(el => el.classList.add('nodelist-closed'));
      }
    }
  };


  const DisplayElement = () => {
    const module = openNode.display.module || 'default';
    const displayComponent = openNode.display.component[module];

    return displayComponent(openNode.display.props);
  };

  return React.createElement('div', {className: 'finderui-display'},
    React.createElement('button', {className: 'finderui-display-nodelist-toggle', onClick: () => toggleNodelist()}, '+-'),
    React.createElement('div', {className: 'finderui-display-viewport'},
      React.createElement('div', {className: 'finderui-display-content-container'},
        React.createElement(DisplayElement)
      )
    ),
  );
};

module.exports = FinderDisplay;
module.exports.default = FinderDisplay;
