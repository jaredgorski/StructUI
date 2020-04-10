import HelloName from './components/HelloName';
import HelloWorld from './components/HelloWorld';

export const structUIConfig = {
  nodes: {
    myDirectory: {
      icon: {
        open: '+',
      },
      label: 'My Directory',
      childNodes: {
        helloName: {
          icon: {
            open: '+',
          },
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
      icon: {
        open: '+',
      },
      label: 'Hello World',
      display: {
        component: HelloWorld,
      },
    },
  },
};
