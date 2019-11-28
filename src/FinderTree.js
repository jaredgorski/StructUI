const React = require('react');
const {classNames} = require('./util/finder-classnames');

const FinderDirectory = props => {
  const classes = classNames({
    'fui-directory': true,
    'dir-open': props.node.open === true || false,
  });
  const elProps = {className: classes};

  if (props.node.elementId) {
    elProps.id = props.node.elementId;
  }

  return React.createElement('li', elProps,
    React.createElement(FinderItem, props),
  );
};

const FinderFile = props => {
  const classes = classNames({
    'fui-file': true,
    'file-open': props.node.open === true || false,
  });
  const elProps = {className: classes};

  if (props.node.elementId) {
    elProps.id = props.node.elementId;
  }

  return React.createElement('li', elProps,
    React.createElement(FinderItem, props),
  );
};

const FinderItem = ({node, handleNodeSelect, isOpen}) => {
  const itemTitle = node.title ? node.title : node.label;
  const itemIcon = () => {
    if (node.open === true) {
      if (node.icon && node.icon.open) {
        return React.createElement('span', {className: 'fui-item-icon'}, node.icon.open);
      }
    } else {
      if (node.icon && node.icon.closed) {
        return React.createElement('span', {className: 'fui-item-icon'}, node.icon.closed);
      }
    }

    return null;
  };

  if (node.link && node.link.props) {
    const linkElProps = node.link.props || {};

    if (node.link.element) {
      return React.createElement(node.link.element, linkElProps,
        React.createElement('a', {title: itemTitle},
          itemIcon(),
          React.createElement('span', {className: 'fui-item-label'}, node.label),
        )
      );
    } else {
      const linkProps = Object.assign({}, {title: itemTitle}, linkElProps);
      return React.createElement('a', linkProps,
        itemIcon(),
        React.createElement('span', {className: 'fui-item-label'}, node.label),
      );
    }
  } else {
    return React.createElement('a', {title: itemTitle, onClick:  () => handleNodeSelect(node)},
      itemIcon(),
      React.createElement('span', {className: 'fui-item-label'}, node.label),
    );
  }
};

const FinderTree = ({nodeState: nodes, handleNodeSelect}) => {
  const finderItems = Object.keys(nodes).map(nodeKey => {
    if (nodes[nodeKey].hasOwnProperty('childNodes')) {
      return React.createElement(FinderDirectory, {
        key: `fdkey-${nodes[nodeKey].label}`,
        node: nodes[nodeKey],
        handleNodeSelect,
      });
    } else {
      return React.createElement(FinderFile, {
        key: `ffkey-${nodes[nodeKey].label}`,
        node: nodes[nodeKey],
        handleNodeSelect,
      });
    }
  });

  return React.createElement('ul', {className: 'fui-nodelist'}, finderItems);
};

module.exports = FinderTree;
module.exports.default = FinderTree;
