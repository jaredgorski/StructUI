const React = require('react');
const FinderDisplay = require('./FinderDisplay');
const FinderTree = require('./FinderTree');

const NodeContent = ({config, nodeState, setState}) => {
  const activeNode = Object.values(nodeState).find(node => node.open);

  if (activeNode) {
    if (activeNode.hasOwnProperty('childNodes')) {
      return React.createElement(FinderPane, {config, nodeState: activeNode.childNodes, setState});
    } else {
      return React.createElement(FinderDisplay, {config, activeNode});
    }
  } else {
    return null;
  }
};

const FinderPane = ({config = {}, nodeState, setState}) => {
  return React.createElement('div', {className: 'finderui-pane'},
    React.createElement(FinderTree, {config, nodeState, handleNodeSelect: setState}),
    React.createElement(NodeContent, {config, nodeState, setState}),
  );
};

module.exports = FinderPane;
module.exports.default = FinderPane;
