import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import FileTraveler from './components/Explorer/Explorer';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route path='/' component={FileTraveler} />
      </Layout>
    );
  }
}
