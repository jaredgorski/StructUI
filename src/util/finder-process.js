const {getNodeAtPath, updateNodePathWithSelection} = require('./finder-select');

function addNodeIdsAndPaths(nodes, currentPath = []) {
  Object.keys(nodes).forEach(key => {
    nodes[key].id = key;

    const keyPath = currentPath.concat(nodes[key].id);
    nodes[key].keyPath = keyPath;

    if (nodes[key].hasOwnProperty('childNodes')) {
      addNodeIdsAndPaths(nodes[key].childNodes, keyPath);
    }
  });
}

function getProcessedNodes(nodes = {}) {
  const newNodes = Object.assign({}, nodes);

  addNodeIdsAndPaths(newNodes);

  return newNodes;
}

function getProcessedProps(props) {
  const newProps = Object.assign({}, props);

  if (Array.isArray(newProps.activeNodePath) && newProps.activeNodePath.length > 0) {
    let {activeNodePath, nodes} = newProps;

    nodes = getProcessedNodes(nodes);
    newProps.nodes = updateNodePathWithSelection(nodes, activeNodePath);
    newProps.initialActiveNode = getNodeAtPath(nodes, activeNodePath);
  } else if (newProps.config && Array.isArray(newProps.config.defaultNodePath) && newProps.config.defaultNodePath.length > 0) {
    let {config: {defaultNodePath}, nodes} = newProps;

    nodes = getProcessedNodes(nodes);
    newProps.nodes = updateNodePathWithSelection(nodes, defaultNodePath);
    newProps.initialActiveNode = getNodeAtPath(nodes, defaultNodePath);
  } else {
    newProps.nodes = getProcessedNodes(newProps.nodes);
  }

  return newProps;
};

module.exports = {
  getProcessedProps,
};
