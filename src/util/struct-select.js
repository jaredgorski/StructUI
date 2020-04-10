function getNodeAtPath(nodeObjs = {}, nodePath = []) {
  let currentNode = nodeObjs;

  let visitedStr = '';
  nodePath.forEach((id, index) => {
    visitedStr += `/${id}`

    if (index === 0 && currentNode.hasOwnProperty(id)) {
      currentNode = currentNode[id];
    } else if (currentNode.hasOwnProperty('childNodes') && currentNode.childNodes.hasOwnProperty(id)) {
      currentNode = currentNode.childNodes[id];
    } else {
      console.error('nodeObjs at error: ', nodeObjs);
      throw new Error(`Path does not exist at ${visitedStr}`);
    }
  });

  return currentNode;
}

function updateNodePathWithSelection(nodeObjs = {}, nodePath = [], labelIndex = 0) {
  return Object.values(nodeObjs).reduce((updatedNodeObjs, nodeObj) => {
    const id = nodePath[labelIndex];

    updatedNodeObjs[nodeObj.id] = nodeObj;
    updatedNodeObjs[nodeObj.id].open = nodeObj.id === id;

    if (nodeObj.hasOwnProperty('childNodes')) {
      if (nodePath.length > labelIndex + 1) {
        const newLabelIndex = labelIndex + 1;
        updatedNodeObjs[nodeObj.id].childNodes = updateNodePathWithSelection(nodeObj.childNodes, nodePath, newLabelIndex);
      } else {
        updatedNodeObjs[nodeObj.id].childNodes = updateNodePathWithSelection(nodeObj.childNodes, []);
      }
    }

    return updatedNodeObjs;
  }, {});
}

module.exports = {
  getNodeAtPath,
  updateNodePathWithSelection,
};
