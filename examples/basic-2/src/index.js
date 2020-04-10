import React from 'react';
import ReactDOM from 'react-dom';
import StructUI from 'structui';
import {structUIConfig} from './structui-config';

import '../../reset.css';
import '../../../styles.css';
import './index.css';

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
