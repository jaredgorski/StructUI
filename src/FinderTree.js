const React = require('react');
const {classNames} = require('./util/finder-classnames');

const FinderDirectory = props => {
  const classes = classNames({
    'finderui-directory': true,
    'dir-open': props.node.open === true || false,
  });

  return React.createElement('li', {className: classes},
    React.createElement(FinderItem, props),
  );
};

const FinderFile = props => {
  const classes = classNames({
    'finderui-file': true,
    'file-open': props.node.open === true || false,
  });

  return React.createElement('li', {className: classes},
    React.createElement(FinderItem, props),
  );
};

const FinderItem = ({node, handleNodeSelect, isOpen}) => {
  const itemTitle = node.title ? node.title : node.label;
  const itemIcon = () => {
    if (node.open === true) {
      if (node.icon && node.icon.open) {
        return React.createElement('span', {className: 'finderui-item-icon'}, node.icon.open);
      }
    } else {
      if (node.icon && node.icon.closed) {
        return React.createElement('span', {className: 'finderui-item-icon'}, node.icon.closed);
      }
    }

    return null;
  };

  if (node.link && node.link.element && node.link.props) {
    const linkProps = node.link.props || {};
    return React.createElement(node.link.element, linkProps,
      React.createElement('a', {title: itemTitle},
        itemIcon(),
        React.createElement('span', {className: 'finderui-item-label'}, node.label),
      )
    );
  } else {
    return React.createElement('a', {title: itemTitle, onClick:  () => handleNodeSelect(node)},
      itemIcon(),
      React.createElement('span', {className: 'finderui-item-label'}, node.label),
    );
  }
};

const FinderTree = ({nodes, handleNodeSelect}) => {
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

  return React.createElement('ul', {className: 'finderui-nodelist'}, finderItems);
};

module.exports = FinderTree;
module.exports.default = FinderTree;
