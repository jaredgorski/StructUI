const React = require('react');
const {useEffect} = require('react');

const FinderDisplay = ({config, activeNode, fuiDisplayUtils, mobileMode}) => {
  const DisplayElement = () => {
    const module = activeNode.display.module || 'default';
    const isClass = activeNode.display.isClass === true || false;
    let displayComponent = activeNode.display.component;

    useEffect(() => {
      if (mobileMode) {
        document.documentElement.classList.add('fui-pane-closed');
      }
    }, []);

    if (module === 'default' && typeof displayComponent !== 'function' && typeof displayComponent.default === 'function') {
      displayComponent = displayComponent.default;
    } else if (typeof displayComponent[module] === 'function') {
      displayComponent = displayComponent[module];
    }

    if (typeof displayComponent === 'function') {
      return React.createElement(displayComponent, {...activeNode.display.props, fuiDisplayUtils});
    } else {
      throw new Error('Display component is not a valid React component (function or class).');
    }
  };

  const toggleNodelist = () => {
    if (typeof document === undefined) {
      return;
    }

    document.documentElement.classList.toggle('fui-pane-closed');
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

  const onClick = () => toggleNodelist();
  const onKeyPress = e => {
    if (e.keyCode === 13) {
      toggleNodelist();
    }
  };

  return React.createElement('div', {className: 'fui-display'},
    React.createElement('button', {className: 'fui-nodelist-toggle', title: toggleBtnTitle(), onClick, onKeyPress, tabIndex: '0'}, 
      React.createElement('span', {className: 'fui-nodelist-toggle-content', tabIndex: '-1'}, toggleBtnIcon()),
    ),
    React.createElement('div', {className: 'fui-display-viewport'},
      React.createElement('div', {className: 'fui-display-document'},
        React.createElement(DisplayElement)
      ),
    ),
  );
};

module.exports = FinderDisplay;
module.exports.default = FinderDisplay;
