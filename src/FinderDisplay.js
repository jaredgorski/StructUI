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
    let displayComponent = openNode.display.component;

    if (module === 'default' && typeof displayComponent !== 'function' && typeof displayComponent.default === 'function') {
      displayComponent = displayComponent.default;
    } else if (typeof displayComponent[module] === 'function') {
      displayComponent = displayComponent[module];
    }

    if (typeof displayComponent === 'function') {
      return displayComponent(openNode.display.props);
    } else {
      throw new Error('Display component is not a function.');
    }
  };

  return React.createElement('div', {className: 'finderui-display'},
    React.createElement('button', {className: 'finderui-display-nodelist-toggle', title: 'Open/close navigator', onClick: () => toggleNodelist()}, 
      React.createElement('span', {className: 'finderui-nodelist-toggle-content'}, '+-'),
    ),
    React.createElement('div', {className: 'finderui-display-viewport'},
      React.createElement('div', {className: 'finderui-display-content-container'},
        React.createElement(DisplayElement)
      ),
    ),
  );
};

module.exports = FinderDisplay;
module.exports.default = FinderDisplay;
