const React = require('react');
const {classNames} = require('./util/finder-classnames');

const FinderDirectory = props => {
  const classes = classNames({
    'finderui-directory': true,
    'dir-open': props.node.open,
  });

  return React.createElement('li', {className: classes},
    React.createElement(FinderItem, props),
  );
};

const FinderFile = props => {
  const classes = classNames({
    'finderui-file': true,
    'file-open': props.node.open,
  });

  return React.createElement('li', {className: classes},
    React.createElement(FinderItem, props),
  );
};

const FinderItem = ({node, handleNodeSelect}) => {
  if (node.link && node.href) {
    return React.createElement('a', {href: node.href, onClick: () => handleNodeSelect(node)},
      React.createElement('p', {className: 'finderui-item-label'}, node.label),
    );
  } else {
    return React.createElement('a', {onClick:  () => handleNodeSelect(node)},
      React.createElement('p', {className: 'finderui-item-label'}, node.label),
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
