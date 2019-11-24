import HelloName from './components/HelloName';
import HelloWorld from './components/HelloWorld';

const words = [
  'sesquipedalian',
  'acrimony',
  'psychotomimetic',
  'malaise',
  'consanguineous',
  'accoutrements',
  'non sequitur',
  'embourgeoisement',
  'cynosure',
  'scintillating',
  'elucidate',
  'pulchritudinous',
  'axiomatic',
];

export const finderUIConfig = {
  config: {
    defaultNodePath: ['helloRandomWord'],
  },
  nodes: {
    myLongDirectory: {
      label: 'My Directory With A Very Long Name',
      childNodes: {
        myNestedDirectory: {
          label: 'My Nested Directory',
          childNodes: {
            helloName: {
              label: 'Hello Name',
              display: {
                component: HelloName,
                props: {
                  name: 'Jordan',
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
    },
    helloRandomWord: {
      label: 'Hello Random Word Generator',
      display: {
        component: HelloName,
        props: {
          name: (() => words[Math.floor(Math.random()*words.length)])(),
        },
      },
    },
  },
};
