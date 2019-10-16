function updateNodesWithSelection(nodeObjs = {}, selectedNode = {}) {
  return Object.values(nodeObjs).reduce((updatedNodeObjs, nodeObj) => {
    updatedNodeObjs[nodeObj.label] = nodeObj;
    updatedNodeObjs[nodeObj.label].open = nodeObj.label === selectedNode.label;

    if (nodeObj.hasOwnProperty('childNodes')) {
      updatedNodeObjs[nodeObj.label].childNodes = updateNodesWithSelection(nodeObj.childNodes, selectedNode);
    }

    return updatedNodeObjs;
  }, {});
}

module.exports = {updateNodesWithSelection};
