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

function updateNodePathWithSelection(nodeObjs = {}, nodePath = [], labelIndex = 0) {
  return Object.values(nodeObjs).reduce((updatedNodeObjs, nodeObj) => {
    const label = nodePath[labelIndex];

    updatedNodeObjs[nodeObj.label] = nodeObj;
    updatedNodeObjs[nodeObj.label].open = nodeObj.label === label;

    if (nodeObj.hasOwnProperty('childNodes') && nodePath.length > labelIndex + 1) {
      const newLabelIndex = labelIndex + 1;
      updatedNodeObjs[nodeObj.label].childNodes = updateNodePathWithSelection(nodeObj.childNodes, nodePath, newLabelIndex);
    }

    return updatedNodeObjs;
  }, {});
}

module.exports = {
  updateNodesWithSelection,
  updateNodePathWithSelection,
};
