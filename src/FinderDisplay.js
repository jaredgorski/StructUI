const React = require('react');

const FinderDisplay = ({config, nodes, openNode}) => {
  const toggleNodelist = () => {
    const nodelistEls = typeof window !== undefined ? document.querySelectorAll('.finderui-nodelist') : [];
    const toggleEl = typeof window !== undefined ? document.querySelector('.finderui-display-nodelist-toggle') : null;

    if (nodelistEls.length) {
      nodelistEls.forEach(el => el.classList.toggle('finderui-nodelist-closed'));
    }

    if (toggleEl) {
      toggleEl.classList.toggle('finderui-toggle-closed');
    }
  };

  const DisplayElement = () => {
    const module = openNode.display.module || 'default';
    const isClass = openNode.display.isClass === true || false;
    let displayComponent = openNode.display.component;

    if (!isClass) {
      if (module === 'default' && typeof displayComponent !== 'function' && typeof displayComponent.default === 'function') {
        displayComponent = displayComponent.default;
      } else if (typeof displayComponent[module] === 'function') {
        displayComponent = displayComponent[module];
      }
    }

    if (typeof displayComponent === 'function') {
      if (isClass) {
        return new displayComponent(openNode.display.props);
      } else {
        return displayComponent(openNode.display.props);
      }
    } else {
      throw new Error('Display component is not a function or the isClass flag is not invoked.');
    }
  };

  const toggleBtnIcon = () => {
    if (config && config.toggleIcon) {
      return config.toggleIcon;
    } else {
      return '+-';
    }
  };

  const toggleBtnTitle = () => {
    if (config && config.toggleTitle) {
      return config.toggleTitle;
    } else {
      return 'Open/close navigator';
    }
  };

  return React.createElement('div', {className: 'finderui-display'},
    React.createElement('button', {className: 'finderui-display-nodelist-toggle', title: toggleBtnTitle(), onClick: () => toggleNodelist()}, 
      React.createElement('span', {className: 'finderui-nodelist-toggle-content'}, toggleBtnIcon()),
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
