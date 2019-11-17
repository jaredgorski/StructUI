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
  updateNodePathWithSelection,
};
