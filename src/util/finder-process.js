const {updateNodePathWithSelection} = require('./finder-select');

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
    newProps.nodes = updateNodePathWithSelection(getProcessedNodes(newProps.nodes), newProps.activeNodePath);
  } else {
    newProps.nodes = getProcessedNodes(newProps.nodes);
  }

  return newProps;
};

module.exports = {
  getProcessedProps,
};
