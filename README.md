# StructUI ![npm bundle size](https://img.shields.io/bundlephobia/min/structui.svg) <img align="left" height="80" src="https://raw.githubusercontent.com/jaredgorski/StructUI/master/.media/structui_80.png">
Simple, dynamic, data-built site explorer.

![](https://raw.githubusercontent.com/jaredgorski/StructUI/master/.media/structui_screenshot.png)

## Install
```
npm i structui
```

## What is it?
StructUI is a React component which consumes a configuration object and generates a web application UI in the form of a file explorer. 

Conceptually, individual webpages on a website can be thought of as files, and groups of files can be organized into directories. This means that a file explorer interface, like Finder on MacOS or Explorer on Windows, can be a natural user-experience for website navigation. The primary benefit of a component like this for React is that it enables a developer to configure an entire website structure from one file, loading pages/components as lambdas while handling server configuration separately for any pages that need to be navigable from the address bar. In other words, entire pages can be loaded as higher-order React components underneath StructUI with very little configuration, allowing for fast and light SPA-like navigation (no server middleware). If address-bar navigation (server middleware) is needed, StructUI can be easily loaded and configured per-page. StructUI also supports wrapping file/directory navigation links with framework router components (like `Link` from Next.js), which enables pre-fetching and other framework-specific features.

## Usage
StructUI is meant to contain an entire user experience, so it will be among the first components invoked in a React application. The below examples provide insight into how the code might actually look, though different applications may vary. Take note that, since the configuration object for StructUI is a JavaScript object, it can be generated programmatically (as long as this is done synchronously) to improve code organization and maintainability.

See the `/examples` directory for examples you can run locally.

### Simple usage
#### structui-config.js:
```js
// These imported components render "displays", AKA "views" or webpages. A display is loaded by StructUI 
// when its corresponding navigation element is activated, much like single-clicking a file in MacOS' 
// Finder opens a display pane with details about the file. Nesting files in directories (via `childNodes`) 
// results in nested panes within StructUI.
import FileDisplay from '../components/FileDisplay';
import SubFile1Display from './components/SubFile1Display';
import SubFile2Display from './components/SubFile2Display';

export const structUIConfig = {
  nodes: {                                // -> `nodes` are directories and files
    myDirectory: {                        // -> directories can hold multiple directories and/or files within them
      label: 'my directory',              // -> `label` defines the node's title in StructUI
      childNodes: {                       // -> `childNodes` is where sub-directories/files are defined for a given
        subfile1: {                       //     directory
          label: 'subfile1',
          display: {                      // -> files are denoted by the lack of `childNodes` and the presence of `display`
            component: SubFile1Display,   // -> the `display`property can load an imported component (class or function) 
          },                              //    when its node is selected
        },
        subfile2: {
          label: 'subfile2',
          display: {
            component: SubFile2Display,
          },
        },
      },
    },
    file: {
      label: 'file',
      display: {
        component: FileDisplay,
      },
    },
  },
};
```

#### index.js:
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import StructUI from 'structui';
import {structUIConfig} from './structui-config';

class App extends React.Component {
  render () {
    return (
      <StructUI {...structUIConfig} />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

### Advanced usage (with Next.js)
#### structui-config.js:
```jsx
import Link from 'next/link';

import FileDisplay from '../components/FileDisplay';
import SubFileDisplay from '../components/SubFileDisplay';

export const structUIConfig = {
  config: {                               // -> `config` allows for customizing global StructUI settings
    toggleIcon: <svg height="18" width="18" viewBox="0 0 30 30"><use href="/static/toggle-icon.svg"></use></svg>,
  },
  nodes: {
    myDirectory: {
      icon: {                             // -> `icon`s can be configured to denote open or closed directories and files
        closed: <svg height="18" width="18" viewBox="0 0 30 30"><use href="/static/closed-icon.svg"></use></svg>,
        open: <svg height="18" width="18" viewBox="0 0 30 30"><use href="/static/open-icon.svg></use></svg>,
      },
      label: 'directory',
      link: {                             // -> the `link` property defines the props/attributes of a node's anchor element
        props: {
          href: '/directory',             // -> when this `directory`'s item in StructUI is clicked, the browser will 
        },                                //    navigate to '/directory'
      },
      childNodes: {
        subfile: {
          icon: {
            closed: <svg height="18" width="18" viewBox="0 0 30 30"><use href="/static/closed-icon.svg"></use></svg>,
            open: <svg height="18" width="18" viewBox="0 0 30 30"><use href="/static/open-icon.svg></use></svg>,
          },
          label: 'subfile',
          link: {
            element: Link,                // -> this `link` will be wrapped by the `Link` routing element from Next.js 
            props: {                      //    imported at the top of this document, allowing for pre-fetching
              href: '/directory/subfile',
            },
          },
          display: {
            component: SubFileDisplay,
            props: {
              title: 'My Subfile',        // -> props can be passed into the display component from StructUI, though 
            },                            //    it's important to note that StructUI only supports synchronous behavior.
          },                              //    any asynchronous data can be loaded and managed on the component itself 
        },                                //    when it is activated by StructUI
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
        component: FileDisplay,
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

import 'structui/styles.css';             // -> default StructUI stylesheet exists in the root of the module

class Site extends App {
  render() {
    const {Component, pageProps} = this.props;
    return <Component {...pageProps} />;
  }
}
```

#### pages/subfile.js:
```jsx
import Head from 'next/head'
import StructUI from 'structui';
import {structUIConfig} from '../props/structui-config';

function SubFile() {
  const initialProps = Object.assign({}, structUIConfig);
  initialProps.activeNodePath = ['directory', 'subfile'];   // -> defines the active filepath 
                                                            //    within StructUI for this page
  return (
    <>
      <Head>
        <title>My Subfile</title>
      </Head>
      <StructUI {...initialProps} />
    </>
  );
}
```

## Try it out
**To see a full implentation of StructUI in action, check out [https://jaredgorski.org](https://jaredgorski.org)**

Try out a [**basic example**](https://github.com/jaredgorski/StructUI/tree/master/examples/basic) to get started. More examples exploring StructUI usage will be coming soon! Here's a gif of what the [basic example](https://github.com/jaredgorski/StructUI/tree/master/examples/basic) can do:

![](https://raw.githubusercontent.com/jaredgorski/StructUI/master/examples/basic/.media/basic-demo.gif)
