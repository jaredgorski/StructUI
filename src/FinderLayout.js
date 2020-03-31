const React = require('react');
const {useState, useEffect, useReducer} = require('react');
const FinderDisplay = require('./FinderDisplay');
const FinderPane = require('./FinderPane');
const {getNodeAtPath, updateNodePathWithSelection} = require('./util/finder-select');
const {FUIRouter, detachRouter, initializeRouter, handleRouting} = require('./util/finder-pushrouter');

const FinderLayout = props => {
  const {config, nodes, initialActiveNode = {}} = props;
  const mobileBreakpoint = (config && config.mobileBreakpoint) || 1024;
  const [mobileMode, setMobileMode] = useState(false);

  const reducer = (state, action) => {
    return {...state, ...action.payload};
  };
  const [state, dispatch] = useReducer(reducer, {
    activeNode: initialActiveNode,
    activeNodeKeyPath: initialActiveNode.keyPath || [],
    nodeState: nodes,
  });

  // View setter and helpers
  const isDisplayNode = node => {
    if (
      node &&
      node.hasOwnProperty('display') &&
      !node.hasOwnProperty('childNodes')
    ) {
      return true;
    }

    return false;
  };

  const setPane = open => {
    if (open) {
      document.documentElement.classList.remove('fui-pane-closed');
    } else {
      document.documentElement.classList.add('fui-pane-closed');
    }
  };

  const togglePane = () => {
    document.documentElement.classList.toggle('fui-pane-closed');
  };

  const setView = keyPath => {
    const activeNodeKeyPath = keyPath || node.keyPath;
    const nodeState = updateNodePathWithSelection(state.nodeState, keyPath);
    const activeNode = getNodeAtPath(nodeState, keyPath);
    const payload = {
      activeNode,
      activeNodeKeyPath,
      nodeState,
    };

    dispatch({payload});
  };

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
      setPane(true);
    }
  }, [mobileMode]);

  // Programmatic menu scroll
  const handlePaneContainerAutoScroll = () => {
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
  };

  useEffect(() => {
    handlePaneContainerAutoScroll();
  });

  // Routing
  const {pushRouter: {enable: shouldRoute, handleBackButton = true} = {}} = config;
  if (shouldRoute) {
    const [router, setRouter] = useState(null);
    const [popStateFlag, setPopStateFlag] = useState(false);

    const handlePopState = (e = {}) => {
      if (handleBackButton) {
        setPopStateFlag(true);
        const {state: {activeNodeKeyPath} = {}} = e;
        if (activeNodeKeyPath) {
          setView(activeNodeKeyPath);
        }
      }
    };

    useEffect(() => {
      if (config.routerCallback && typeof config.routerCallback === 'function') {
        setRouter(FUIRouter({callback: config.routerCallback, onPopState: handlePopState}));
      } else {
        setRouter(FUIRouter({onPopState: handlePopState}));
      }
    }, []);

    useEffect(() => {
      initializeRouter(router, {activeNodeKeyPath: state.activeNodeKeyPath}, state.activeNode);

      return () => {
        detachRouter(router);
      };
    }, [router]);

    useEffect(() => {
      if (!popStateFlag) {
        handleRouting(router, {activeNodeKeyPath: state.activeNodeKeyPath}, state.activeNode);
      }
      setPopStateFlag(false);
    }, [state.activeNodeKeyPath]);
  }

  // Display and navigation logic
  const handleNodeSelect = (selectedNode) => {
    const {callback, keyPath} = selectedNode;

    setView(keyPath);

    if (callback && typeof callback === 'function') {
      callback();
    }
  };

  const FUILink = ({children, className, keypath: keyPath = []}) => {
    const onClick = () => {
      setView(keyPath);
    };

    return React.createElement('span', {className, onClick}, children);
  };

  const DisplayContent = () => {
    const fuiDisplayUtils = {FUILink};

    if (isDisplayNode(state.activeNode)) {
      return React.createElement(FinderDisplay, {config, activeNode: state.activeNode, setPane, togglePane, fuiDisplayUtils, mobileMode});
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
