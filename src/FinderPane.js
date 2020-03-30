const React = require('react');
const FinderTree = require('./FinderTree');

const NodeContent = ({config, nodeState, handleNodeSelect, handlePaneContainerAutoScroll}) => {
  const activeNode = Object.values(nodeState).find(node => node.open);

  if (activeNode && activeNode.hasOwnProperty('childNodes')) {
    return React.createElement(FinderPane, {config, nodeState: activeNode.childNodes, handleNodeSelect, handlePaneContainerAutoScroll});
  }

  return null;
};

const FinderPane = ({config = {}, nodeState, handleNodeSelect, handlePaneContainerAutoScroll}) => {
  return React.createElement('div', {className: 'fui-pane'},
    React.createElement(FinderTree, {config, nodeState, handleNodeSelect}),
    React.createElement(NodeContent, {config, nodeState, handleNodeSelect, handlePaneContainerAutoScroll}),
  );
};

module.exports = FinderPane;
module.exports.default = FinderPane;
