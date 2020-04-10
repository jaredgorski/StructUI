const React = require('react');
const StructTree = require('./StructTree');

const NodeContent = ({config, nodeState, handleNodeSelect, handlePaneContainerAutoScroll}) => {
  const activeNode = Object.values(nodeState).find(node => node.open);

  if (activeNode && activeNode.hasOwnProperty('childNodes')) {
    return React.createElement(StructPane, {config, nodeState: activeNode.childNodes, handleNodeSelect, handlePaneContainerAutoScroll});
  }

  return null;
};

const StructPane = ({config = {}, nodeState, handleNodeSelect, handlePaneContainerAutoScroll}) => {
  return React.createElement('div', {className: 'struct-pane'},
    React.createElement(StructTree, {config, nodeState, handleNodeSelect}),
    React.createElement(NodeContent, {config, nodeState, handleNodeSelect, handlePaneContainerAutoScroll}),
  );
};

module.exports = StructPane;
module.exports.default = StructPane;
