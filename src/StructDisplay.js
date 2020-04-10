const React = require('react');
const {useEffect} = require('react');

const StructDisplay = ({config, activeNode, setPane, togglePane, structDisplayUtils, mobileMode}) => {
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
      return React.createElement(displayComponent, {...activeNode.display.props, structDisplayUtils});
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
    if (e.key === 'Enter') {
      togglePane();
    }
  };

  return React.createElement('div', {className: 'struct-display'},
    React.createElement('button', {className: 'struct-nodelist-toggle', title: toggleBtnTitle(), onClick, onKeyPress, tabIndex: '0'}, 
      React.createElement('span', {className: 'struct-nodelist-toggle-content', tabIndex: '-1'}, toggleBtnIcon()),
    ),
    React.createElement('div', {className: 'struct-display-viewport'},
      React.createElement('div', {className: 'struct-display-document'},
        React.createElement(DisplayElement)
      ),
    ),
  );
};

module.exports = StructDisplay;
module.exports.default = StructDisplay;
