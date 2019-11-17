function FUIRouter(callback = Function()) {
  function _callback(arg) {
    callback(arg);
  }

  function _callbackAndTitle(title) {
    _callback(document.location.href);

    if (title) {
      document.title = title;
    }
  }

  function push(url, title) {
    history.pushState({url, title}, title, url || window.location.pathname);
    _callbackAndTitle(title);

    return document.location.href;
  }

  function replace(url, title) {
    history.replaceState({url, title}, title, url || window.location.pathname);
    _callbackAndTitle(title);

    return document.location.href;
  }

  function _onpopstate(e) {
    push(e.state.url, e.state.title);
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

function handleRouting(router, selectedNode) {
  if (selectedNode.push) {
    const {url, title} = selectedNode.push;
    router.push(url, title);
  } else if (selectedNode.replace) {
    const {url, title} = selectedNode.replace;
    router.replace(url, title);
  }
}

module.exports = {FUIRouter, handleRouting};
