const React = require('react');
const {useState} = require('react');
const FinderDisplay = require('./FinderDisplay');
const FinderTree = require('./FinderTree');
const {
  updateNodesWithSelection,
  updateNodePathWithSelection,
} = require('./util/finder-select');

const NodeContent = ({nodes}) => {
  const openNode = Object.values(nodes).find(node => node.open);

  if (openNode) {
    if (openNode.hasOwnProperty('childNodes')) {
      const newPaneState = {nodes: openNode.childNodes};
      return React.createElement(FinderPane, newPaneState);
    } else {
      const displayState = {nodes, openNode};
      return React.createElement(FinderDisplay, displayState);
    }
  } else {
    return null;
  }
};

const FinderPane = ({nodes: initialNodes, activeNodePath = []}) => {
  const paneNodes = Array.isArray(activeNodePath) && activeNodePath.length
    ? updateNodePathWithSelection(initialNodes, activeNodePath) 
    : initialNodes;
  const [nodes, setNodes] = useState(paneNodes);
  const handleNodeSelect = (selectedNode) => {
    setNodes(updateNodesWithSelection(nodes, {label: null}));
    setNodes(updateNodesWithSelection(nodes, selectedNode));
  };

  const paneState = Object.assign({}, {nodes, handleNodeSelect});

  return React.createElement('div', {className: 'finderui-pane'},
    React.createElement(FinderTree, paneState),
    React.createElement(NodeContent, paneState),
  );
};

module.exports = FinderPane;
module.exports.default = FinderPane;
