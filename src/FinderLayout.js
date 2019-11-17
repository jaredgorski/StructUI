const React = require('react');
const {useState, useEffect} = require('react');
const FinderPane = require('./FinderPane');
const {updateNodePathWithSelection} = require('./util/finder-select');
const {FUIRouter, handleRouting} = require('./util/finder-pushrouter');

const FinderLayout = props => {
  const {config, nodes} = props;
  const [nodeState, setNodeState] = useState(nodes);

  const shouldRoute = config && config.pushRouter === true;
  let router = null;
  if (shouldRoute) {
    useEffect(() => {
      if (config.routerCallback && typeof config.routerCallback === 'function') {
        router = FUIRouter(config.routerCallback);
      } else {
        router = FUIRouter();
      }

      return () => {
        router.clear();
      };
    });
  }

  const setState = (selectedNode) => {
    setNodeState(updateNodePathWithSelection(nodeState, selectedNode.keyPath));

    if (shouldRoute && router) {
      handleRouting(router, selectedNode);
    }
  };

  return React.createElement('main', {className: 'finderui-main'},
    React.createElement('div', {className: 'finderui-frame'},
      React.createElement(FinderPane, {config, nodeState, setState})
    )
  );
};

module.exports = FinderLayout;
module.exports.default = FinderLayout;
