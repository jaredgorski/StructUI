import React from 'react';
import ReactDOM from 'react-dom';
import FinderUI from 'finderui';
import {finderUIConfig} from './finderui-config';

import '../../reset.css';
import '../../../styles.css';

class App extends React.Component {
  render () {
    return (
      <FinderUI {...finderUIConfig} />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
