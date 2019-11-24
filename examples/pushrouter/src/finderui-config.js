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
      url: '/my-subdirectory/hello-' + randomNumber,
    },
    display: {
      component: HelloName,
      props: {
        name: randomNumber,
      },
    },
  };
}

export const finderUIConfig = {
  config: {
    pushRouter: true,
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
                url: '/hello-world',
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
