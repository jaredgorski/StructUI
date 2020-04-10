const React = require('react');
const {classNames} = require('./util/struct-classnames');

const StructDirectory = props => {
  const classes = classNames({
    'struct-directory': true,
    'dir-open': props.node.open === true || false,
  });
  const elProps = {className: classes};

  if (props.node.elementId) {
    elProps.id = props.node.elementId;
  }

  return React.createElement('li', elProps,
    React.createElement(StructItem, props),
  );
};

const StructFile = props => {
  const classes = classNames({
    'struct-file': true,
    'file-open': props.node.open === true || false,
  });
  const elProps = {className: classes};

  if (props.node.elementId) {
    elProps.id = props.node.elementId;
  }

  return React.createElement('li', elProps,
    React.createElement(StructItem, props),
  );
};

const StructItem = ({node, handleNodeSelect}) => {
  const itemTitle = node.title ? node.title : node.label;
  const itemIcon = () => {
    if (node.open === true) {
      if (node.icon && node.icon.open) {
        return React.createElement('span', {className: 'struct-item-icon'}, node.icon.open);
      }
    } else {
      if (node.icon && node.icon.closed) {
        return React.createElement('span', {className: 'struct-item-icon'}, node.icon.closed);
      }
    }

    return null;
  };

  const handleActivate = e => {
    if (e.metaKey || e.ctrlKey) {
      const {keyPath} = node;
      window.open('/' + keyPath.join('/'), '_blank');
    } else {
      handleNodeSelect(node);
    }
  };
  const onClick = handleActivate;
  const onKeyPress = e => {
    if (e.key === 'Enter') {
      handleActivate(e);
    }
  };

  if (node.link && node.link.props) {
    const linkElProps = node.link.props || {};

    if (node.link.element) {
      return React.createElement(node.link.element, linkElProps,
        React.createElement('a', {title: itemTitle},
          React.createElement('span', {tabIndex: '-1'},
            itemIcon(),
            React.createElement('span', {className: 'struct-item-label'}, node.label),
          )
        )
      );
    } else {
      const linkProps = Object.assign({}, {title: itemTitle}, linkElProps);

      if (!linkProps.hasOwnProperty('href')) {
        linkProps.onClick = onClick;
        linkProps.onKeyPress = onKeyPress;
        linkProps.tabIndex = '0';
      }

      return React.createElement('a', linkProps,
        React.createElement('span', {tabIndex: '-1'},
          itemIcon(),
          React.createElement('span', {className: 'struct-item-label'}, node.label),
        )
      );
    }
  } else {
    return React.createElement('a', {title: itemTitle, onClick, onKeyPress, tabIndex: '0'},
      React.createElement('span', {tabIndex: '-1'},
        itemIcon(),
        React.createElement('span', {className: 'struct-item-label'}, node.label),
      )
    );
  }
};

const StructTree = ({nodeState: nodes, handleNodeSelect}) => {
  const structItems = Object.keys(nodes).map(nodeKey => {
    if (nodes[nodeKey].hasOwnProperty('childNodes')) {
      return React.createElement(StructDirectory, {
        key: `fdkey-${nodes[nodeKey].label}`,
        node: nodes[nodeKey],
        handleNodeSelect,
      });
    } else {
      return React.createElement(StructFile, {
        key: `ffkey-${nodes[nodeKey].label}`,
        node: nodes[nodeKey],
        handleNodeSelect,
      });
    }
  });

  return React.createElement('ul', {className: 'struct-nodelist'}, structItems);
};

module.exports = StructTree;
module.exports.default = StructTree;
