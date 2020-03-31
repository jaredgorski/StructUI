const React = require('react');
const {useEffect} = require('react');

const FinderDisplay = ({config, activeNode, setPane, togglePane, fuiDisplayUtils, mobileMode}) => {
  const DisplayElement = () => {
    useEffect(() => {
      if (mobileMode) {
        setPane(false);
      }
    }, []);

    const {display: {module = 'default'} = {}} = activeNode;
    let {display: {component: displayComponent} = {}} = activeNode;

    if (!module || !displayComponent) {
      throw new Error(`Display configuration not well formed at path: ${activeNode.keyPath}`);
    }

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

  const onClick = () => togglePane();
  const onKeyPress = e => {
    if (e.keyCode === 13) {
      togglePane();
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
