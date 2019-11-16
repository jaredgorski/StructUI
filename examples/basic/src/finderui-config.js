import HelloName from './components/HelloName';
import HelloWorld from './components/HelloWorld';

export const finderUIConfig = {
  nodes: {
    myDirectory: {
      label: 'My Directory',
      childNodes: {
        helloName: {
          label: 'Hello Name',
          display: {
            component: HelloName,
            module: 'HelloName',
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
};
