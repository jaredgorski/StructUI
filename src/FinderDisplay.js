const React = require('react');

const FinderDisplay = ({config, activeNode}) => {
  const toggleNodelist = () => {
    const nodelistEls = typeof window !== undefined ? document.querySelectorAll('.fui-nodelist') : [];
    const toggleEl = typeof window !== undefined ? document.querySelector('.fui-nodelist-toggle') : null;

    if (nodelistEls.length) {
      nodelistEls.forEach(el => el.classList.toggle('fui-nodelist-closed'));
    }

    if (toggleEl) {
      toggleEl.classList.toggle('fui-toggle-closed');
    }
  };

  const DisplayElement = () => {
    const module = activeNode.display.module || 'default';
    const isClass = activeNode.display.isClass === true || false;
    let displayComponent = activeNode.display.component;

    if (module === 'default' && typeof displayComponent !== 'function' && typeof displayComponent.default === 'function') {
      displayComponent = displayComponent.default;
    } else if (typeof displayComponent[module] === 'function') {
      displayComponent = displayComponent[module];
    }

    if (typeof displayComponent === 'function') {
      return React.createElement(displayComponent, activeNode.display.props);
    } else {
      throw new Error('Display component is not a valid React component (function or class).');
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

  return React.createElement('div', {className: 'fui-display'},
    React.createElement('button', {className: 'fui-nodelist-toggle', title: toggleBtnTitle(), onClick: () => toggleNodelist()}, 
      React.createElement('span', {className: 'fui-nodelist-toggle-content'}, toggleBtnIcon()),
    ),
    React.createElement('div', {className: 'fui-display-viewport'},
      React.createElement(DisplayElement)
    ),
  );
};

module.exports = FinderDisplay;
module.exports.default = FinderDisplay;
