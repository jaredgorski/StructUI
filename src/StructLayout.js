const React = require('react');
const StructDisplay = require('./StructDisplay');
const StructPane = require('./StructPane');
const {StructRouter, detachRouter, initializeRouter, handleRouting} = require('./util/struct-pushrouter');
const {getNodeAtPath, updateNodePathWithSelection} = require('./util/struct-select');
const {useState, useEffect, useReducer} = require('react');

const StructLayout = props => {
  const {config, nodes, initialActiveNode = {}} = props;

  const {
    layout: {
      pane = true,
    } = {},
    lifecycle: {
      cleanup = () => {},
      initiate = () => {},
      render = () => {},
    } = {},
    mobileBreakpoint: configMobileBreakpoint,
    pushRouter: {
      enable: shouldRoute,
      handleBackButton = true,
    } = {},
  } = config;

  const mobileBreakpoint = configMobileBreakpoint || 1024;
  const [mobileMode, setMobileMode] = useState(false);

  const reducer = (state, action) => {
    return {...state, ...action.payload};
  };
  const [state, dispatch] = useReducer(reducer, {
    activeNode: initialActiveNode,
    activeNodeKeyPath: initialActiveNode.keyPath || [],
    nodeState: nodes,
  });

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
    if (open === true) {
      document.documentElement.classList.remove('struct-pane-closed');
    } else {
      document.documentElement.classList.add('struct-pane-closed');
    }
  };

  const togglePane = () => {
    document.documentElement.classList.toggle('struct-pane-closed');
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

  const handleNodeSelect = (selectedNode) => {
    const {callback, keyPath, mainClass} = selectedNode;

    setView(keyPath);

    if (callback && typeof callback === 'function') {
      callback();
    }
  };

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
        setRouter(StructRouter({callback: config.routerCallback, onPopState: handlePopState}));
      } else {
        setRouter(StructRouter({onPopState: handlePopState}));
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

  const initProgrammaticResponsive = () => {
    const handleMobileMode = ({matches}) => {
      if (matches) {
        document.documentElement.classList.add('struct-mobile-mode');
      } else {
        document.documentElement.classList.remove('struct-mobile-mode');
        setPane(true);
      }

      setMobileMode(matches);
    };

    const mql = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`);

    handleMobileMode(mql);
    document.documentElement.classList.add('struct-loaded');

    mql.addListener(handleMobileMode);

    return () => mql.removeListener(handleMobileMode);
  };

  const handlePaneContainerAutoScroll = () => {
    setTimeout(() => {
      const nodelistEls = document.querySelectorAll('.struct-nodelist');
      if (nodelistEls.length > 0) {
        nodelistEls[nodelistEls.length - 1].scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'start',
        });
      }
    }, 300);
  };

  // Lifecycle: Initiate + Cleanup
  useEffect(() => {
    const cleanupMql = initProgrammaticResponsive();
    initiate();

    return () => {
      cleanupMql();
      cleanup();
    };
  }, []);

  // Lifecycle: Render
  useEffect(() => {
    handlePaneContainerAutoScroll();
    render();
  });

  const StructLink = ({children, className, href = '', keypath: keyPath = [], target}) => {
    if (!keyPath.length && href) {
      keyPath = href.toString()
        .split('/')
        .filter(x => x)
        .map(x => decodeURI(x));
    }

    const handleActivate = e => {
      if (e.metaKey || e.ctrlKey) {
        const url = href || '/' + keyPath.join('/');
        window.open(url, '_blank');
      } else if (target) {
        const url = href || '/' + keyPath.join('/');
        window.open(url, target);
      } else {
        setView(keyPath);
      }
    };
    const onClick = handleActivate;
    const onKeyPress = e => {
      if (e.key === 'Enter') {
        handleActivate(e);
      }
    };

    return React.createElement('a', {'struct-element': 'struct-link', className, onClick, onKeyPress, tabIndex: '0'},
      React.createElement('span', {tabIndex: '-1'}, children),
    );
  };

  const PaneContent = () => {
    if (pane) {
      return React.createElement('div', {className: 'struct-pane-container'},
        React.createElement(StructPane, {config, nodeState: state.nodeState, handleNodeSelect, handlePaneContainerAutoScroll}),
      );
    }

    return null;
  };

  const DisplayContent = () => {
    const structDisplayUtils = {StructLink};

    if (isDisplayNode(state.activeNode)) {
      return React.createElement(StructDisplay, {config, activeNode: state.activeNode, setPane, togglePane, structDisplayUtils, mobileMode});
    }

    return null;
  };

  return React.createElement('main', {className: `struct-main ${state.activeNode.mainClass || ''}`.trim()},
    React.createElement('div', {className: 'struct-frame'},
      React.createElement(PaneContent),
      React.createElement(DisplayContent),
    )
  );
};

module.exports = StructLayout;
module.exports.default = StructLayout;
