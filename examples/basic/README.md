# StructUI: Basic example

![](https://raw.githubusercontent.com/jaredgorski/StructUI/master/examples/basic/.media/basic-demo.gif)

This example demonstrates the simplest form of StructUI-based web app. It consists of a basic configuration, with one `directory` node (`myDirectory`, labeled as `My Directory` in the UI) containing one `file` within the `helloName` node (labeled as `Hello Name`) and one `file` node (labeled as `Hello World`).

The `Hello World` file is very basic, simply loading the `HelloWorld` component which displays the words `Hello World` in its view. The `Hello Name` file is a little bit more in-depth since it takes a `props` object, in this case simply containing one key-value pair (`name: 'Tom'`). The `HelloName` component inserts the value of this `name` prop into its view, resulting in `Hello Tom` being rendered when the `Hello Name` file is selected in the UI. Feel free to clone this example locally and insert your own name instead of `Tom` to see your name rendered by `HelloName`.

**If you've cloned this example locally, simply run it with the following command:**
```
npm run start
```

**Here is the configuration object used by this example:**
```js
{
  nodes: {
    myDirectory: {
      label: 'My Directory',
      childNodes: {
        helloName: {
          label: 'Hello Name',
          display: {
            component: HelloName,
            props: {
              name: 'Tom',
            },
          },
        },
      },
    },
    helloWorld: {
      label: 'Hello World',
      display: {
        component: HelloWorld,
      },
    },
  },
}
```

Take note that this example needs no server to display different views, since it simply loads the components passed into the configuration when they are demanded by selecting a `file` on the UI. This means that creating a simple web app is as easy as writing a few views in the form of React components, importing them into a configuration object, and feeding that object to StructUI.

In order to assign each view to a different path on a website, some sort of router/server middleware is necessary.
