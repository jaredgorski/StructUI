const React = require('react');
const {useState, useEffect, useReducer} = require('react');
const FinderDisplay = require('./FinderDisplay');
const FinderPane = require('./FinderPane');
const {getNodeAtPath, updateNodePathWithSelection} = require('./util/finder-select');
const {FUIRouter, handleRouting} = require('./util/finder-pushrouter');

const FinderLayout = props => {
  const {config, nodes, initialActiveNode = {}} = props;
  const mobileBreakpoint = (config && config.mobileBreakpoint) || 1024;
  const [mobileMode, setMobileMode] = useState(false);

  const reducer = (state, action) => {
    return { ...state, ...action.payload };
  };
  const [state, dispatch] = useReducer(reducer, {
    activeNode: initialActiveNode,
    nodeState: nodes,
  });

  // Programmatic responsive
  useEffect(() => {
    const handleResize = () => {
      setMobileMode(window.innerWidth < mobileBreakpoint);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    document.documentElement.classList.add('fui-loaded');

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (mobileMode) {
      document.documentElement.classList.add('fui-mobile-mode');
    } else {
      document.documentElement.classList.remove('fui-mobile-mode');
    }
  }, [mobileMode]);

  // Programmatic menu scroll
  const handlePaneContainerAutoScroll = () => {
    if (typeof document !== undefined) {
      setTimeout(() => {
        const nodelistEls = document.querySelectorAll('.fui-nodelist');
        if (nodelistEls.length > 0) {
          nodelistEls[nodelistEls.length - 1].scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'start',
          });
        }
      }, 300);
    }
  };

  useEffect(() => {
    handlePaneContainerAutoScroll();
  });

  // Routing
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

  // Display and navigation logic
  const handleNodeSelect = (selectedNode) => {
    const {callback, keyPath} = selectedNode;

    dispatch({
      payload: {
        activeNode: selectedNode,
        nodeState: updateNodePathWithSelection(state.nodeState, keyPath),
      },
    });

    if (shouldRoute && router) {
      handleRouting(router, selectedNode);
    }

    if (callback && typeof callback === 'function') {
      callback();
    }
  };

  const FUILink = ({children, className, keypath: keyPath = []}) => {
    const onClick = () => {
      dispatch({
        payload: {
          activeNode: getNodeAtPath(state.nodeState, keyPath),
          nodeState: updateNodePathWithSelection(state.nodeState, keyPath),
        },
      });

      if (shouldRoute && router) {
        handleRouting(router, selectedNode);
      }
    };

    return React.createElement('span', {className, onClick}, children);
  };

  const DisplayContent = () => {
    const fuiDisplayUtils = {FUILink};

    if (state.activeNode.hasOwnProperty('display') && !state.activeNode.hasOwnProperty('childNodes')) {
      return React.createElement(FinderDisplay, {config, activeNode: state.activeNode, fuiDisplayUtils, mobileMode});
    }

    return null;
  };

  return React.createElement('main', {className: 'fui-main'},
    React.createElement('div', {className: 'fui-frame'},
      React.createElement('div', {className: 'fui-pane-container'},
        React.createElement(FinderPane, {config, nodeState: state.nodeState, handleNodeSelect, handlePaneContainerAutoScroll}),
      ),
      React.createElement(DisplayContent),
    )
  );
};

module.exports = FinderLayout;
module.exports.default = FinderLayout;
