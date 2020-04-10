# StructUI: pushRouter example

![](https://raw.githubusercontent.com/jaredgorski/StructUI/master/examples/pushrouter/.media/pushrouter-demo.gif)

This example demonstrates a basic StructUI setup with the `pushRouter` enabled. The `pushRouter` accomplishes very basic interaction with the HTML5 History API, meaning that it enacts changes in the `document.title` and `window.location` to give the illusion of navigation between separate webpages when a given view is activated within StructUI.

The built-in `pushRouter` is very light and should only be used in tandem with another framework (such as Next.js) to fill in missing/buggy functionality (such as support for the browser's `Back` button). `pushRouter`'s functionality can be replaced by using the `link` property within the StructUI configuration object to wrap StructUI's navigation links in some `<Router>` component (such as `Link` from Next.js or the equivalent from React router). `pushRouter` largely serves as a POC in case a StructUI-specific router component becomes necessary for users who don't wish to run StructUI on top of Next.js or React router.

**If you've cloned this example locally, simply run it with the following command:**
```
npm run start
```
