function FUIRouter({callback = Function(), onPopState}) {
  function _callback(arg) {
    callback(arg);
  }

  function _callbackAndTitle(title) {
    _callback(document.location.href);

    if (title) {
      document.title = title;
    }
  }

  function push(state = {}, title = '', url = '') {
    const routeState = {...state, url, as: url};
    history.pushState(routeState, title, url || window.location.pathname);
    _callbackAndTitle(title);

    return document.location.href;
  }

  function replace(state = {}, title = '', url = '') {
    const routeState = {...state, url, as: url};
    history.replaceState(routeState, title, url || window.location.pathname);
    _callbackAndTitle(title);

    return document.location.href;
  }

  function _onpopstate(e) {
    onPopState(e);
    _callback(document.location.href);
  }

  function clear() {
    window.removeEventListener('popstate', _onpopstate);
  }

  _callback(document.location.href);

  window.addEventListener('popstate', _onpopstate);

  return {
    clear,
    push,
    replace,
  };
}

function detachRouter(router) {
  if (router) {
    router.clear();
  }
}

function initializeRouter(router, state, activeNode) {
  if (router) {
    const {title, url} = Object.assign(activeNode.replace || {}, activeNode.push || {});
    router.replace(state, title || document.title, url || document.location.href);
  }
}

function handleRouting(router, state, activeNode) {
  if (router && activeNode) {
    if (activeNode.push) {
      const {title, url} = activeNode.push;
      router.push(state, title, url);
    } else if (activeNode.replace) {
      const {title, url} = activeNode.replace;
      router.replace(state, title, url);
    }
  }
}

module.exports = {FUIRouter, detachRouter, initializeRouter, handleRouting};
