import HelloName from './components/HelloName';
import HelloWorld from './components/HelloWorld';

const helloRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 1000);

  return {
    icon: {
      closed: '◧',
      open: '◨',
    },
    label: 'Hello Random Number',
    push: {
      title: 'Hello ' + randomNumber,
      url: '/hello-' + randomNumber,
    },
    display: {
      component: HelloName,
      props: {
        name: randomNumber,
      },
    },
  };
}

export const structUIConfig = {
  config: {
    pushRouter: {
      enable: true,
    },
  },
  nodes: {
    myDirectory: {
      icon: {
        closed: '◧',
        open: '◨',
      },
      label: 'My Directory',
      push: {
        title: 'My Directory',
        url: '/my-directory',
      },
      childNodes: {
        mySubDirectory: {
          icon: {
            closed: '◧',
            open: '◨',
          },
          label: 'My Subdirectory',
          push: {
            title: 'My Subdirectory',
            url: '/my-directory/my-subdirectory',
          },
          childNodes: {
            helloWorld: {
              icon: {
                closed: '◧',
                open: '◨',
              },
              label: 'Hello World',
              push: {
                title: 'Hello World',
                url: 'my-directory/my-subdirectory/hello-world',
              },
              display: {
                component: HelloWorld,
              },
            },
          },
        },
        helloName: {
          icon: {
            closed: '◧',
            open: '◨',
          },
          label: 'Hello Name',
          push: {
            title: 'Hello Name',
            url: '/my-subdirectory/hello-name',
          },
          display: {
            component: HelloName,
            props: {
              name: 'Diana',
            },
          },
        },
      },
    },
    helloRandomNumber: helloRandomNumber(),
  },
};
