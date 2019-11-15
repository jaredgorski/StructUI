# FinderUI
Simple, dynamic, filesystem-inspired site explorer.

## What is it?
FinderUI is a React component which consumes a configuration object (JavaScript object: API defined under **Usage**) and generates a web application UI in the form of a file explorer. Conceptually, individual webpages on a website can be thought of as files, and groups of files can be organized into directories. This makes a file explorer interface, like Finder on MacOS or Explorer on Windows, a natural user-experience for website navigation. The primary benefit of a component like this for React is being able to configure an entire website structure from one file, loading pages/components as lambdas while handling server configuration separately for pages that should be navigable from the address bar. In other words, entire pages can be loaded as higher-order React components underneath FinderUI with very little configuration, allowing for fast and light SPA-like navigation (no server middleware). If address-bar navigation (server middleware) is needed, FinderUI can be easily loaded and configured per-page. FinderUI also supports wrapping file/directory navigation links with framework router components (like `Link` from Next.js), which enables pre-fetching and other framework-specific features.

**To see this component in action, check out https://jaredgorski.com**

## Usage
### Simple
#### finderui-config.js:
```js
// These imported components render "displays", AKA "views" or webpages. A display is loaded by FinderUI 
// when its corresponding navigation element is activated, much like single-clicking a file in MacOS' 
// Finder opens a display pane with details about the file. Nesting files in directories (via `childNodes`) 
// results in nested panes within FinderUI.
import File from '../components/file';
import SubFile1 from '../components/subfile1';
import SubFile2 from '../components/subfile2';

const finderUIConfig = {
  nodes: {                            // -> `nodes` are directories and files
    directory: {                      // -> directories can hold multiple directories and/or files within them
      label: 'directory',             // -> `label` defines the node's title in FinderUI
      childNodes: {                   // -> `childNodes` is where sub-directories/files are defined for a given
        subfile1: {                   //     directory
          label: 'subfile1',
          display: {                  // -> files are denoted by the lack of `childNodes` and the presence of `display`
            component: SubFile1,      // -> the `display`property can load an imported component (class or function) 
          },                          //    when its node is selected
        },
        subfile2: {
          label: 'subfile2',
          display: {
            component: SubFile2,
          },
        },
      },
    },
    file: {
      label: 'file',
      display: {
        component: File,
      },
    },
  },
};
```

#### index.js:
```jsx
import ReactDOM from 'react-dom';
import App from './components/app';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

#### app.js:
```jsx
import React from 'react';
import FinderUI from 'finder-ui';
import {finderUIConfig} from '../props/finderui-config';

class App extends React.Component {
  render () {
    return (
      <FinderUI {...finderUIConfig} />
    );
  }
}
```

### Advanced (with Next.js)
```jsx
import Link from 'next/link';

import File from '../components/file';
import SubFile from '../components/subfile';

const finderUIConfig = {
  config: {                           // -> `config` allows for customizing global FinderUI settings
    toggleIcon: <svg height="18" width="18" viewBox="0 0 30 30"><use href="/static/toggle-icon.svg"></use></svg>,
  },
  nodes: {
    directory: {
      icon: {                         // -> `icon`s can be configured to denote open or closed directories and files
        closed: <svg height="18" width="18" viewBox="0 0 30 30"><use href="/static/closed-icon.svg"></use></svg>,
        open: <svg height="18" width="18" viewBox="0 0 30 30"><use href="/static/open-icon.svg></use></svg>,
      },
      label: 'directory',
      link: {                         // -> the `link` property defines the props/attributes of a node's anchor element
        props: {
          href: '/directory',         // -> when this `directory`'s item in FinderUI is clicked, the browser will 
        },                            //    navigate to '/directory'
      },
      childNodes: {
        file: {
          icon: {
            closed: <svg height="18" width="18" viewBox="0 0 30 30"><use href="/static/closed-icon.svg"></use></svg>,
            open: <svg height="18" width="18" viewBox="0 0 30 30"><use href="/static/open-icon.svg></use></svg>,
          },
          label: 'subfile',
          link: {
            element: Link,            // -> this `link` will be wrapped by the `Link` routing element from Next.js 
            props: {                  //    imported at the top of this document, allowing for pre-fetching
              href: '/directory/subfile',
            },
          },
          display: {
            component: SubFile,
            props: {
              title: 'My Subfile',    // -> props can be passed into the display component from FinderUI, though 
            },                        //    it's important to note that FinderUI only supports synchronous behavior.
          },                          //    any asynchronous data can be loaded and managed on the component itself 
        },                            //    when it is activated by FinderUI
      },
    },
    file: {
      icon: {
        closed: <svg height="18" width="18" viewBox="0 0 30 30"><use href="/static/closed-icon.svg"></use></svg>,
        open: <svg height="18" width="18" viewBox="0 0 30 30"><use href="/static/open-icon.svg></use></svg>,
      },
      label: 'file',
      link: {
        element: Link,
        props: {
          href: '/file',
        },
      },
      display: {
        component: File,
        props: {
          color: 'firebrick',
        },
      },
    },
  },
};
```

#### _app.js:
```jsx
import App from 'next/app';
import React from 'react';

import 'finderui/styles.css';         // -> default FinderUI stylesheet exists in the root of the module

class Site extends App {
  render() {
    const {Component, pageProps} = this.props;
    return <Component {...pageProps} />;
  }
}
```

#### components/subfile.js:
```jsx
import Head from 'next/head'
import FinderUI from 'finder-ui';
import {finderUIConfig} from '../props/finderui-config';

function SubFile() {
  const initialProps = Object.assign({}, finderUIConfig);
  initialProps.activeNodePath = ['directory', 'subfile'];   // -> defines the active filepath 
                                                            //    within FinderUI for this page
  return (
    <>
      <Head>
        <title>My Subfile</title>
      </Head>
      <FinderUI {...initialProps} />
    </>
  );
}
```
