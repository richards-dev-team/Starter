import React, { Component, Fragment } from 'react';
import layoutStyles from '@styles/layoutStyles.module.scss'
import Navigation from './Navigation';
import getFirebase, { FirebaseContext } from './Firebase';
import withAuthentication from './Session/withAuthentication';
import '@styles/General.css'

class Layout extends Component {
  state = {
    firebase: null,
  };

  componentDidMount() {
    const app = import('firebase/app');
    const auth = import('firebase/auth');
    const database = import('firebase/database');

    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0]);

      this.setState({ firebase });
    });
  }

  render() {
    return (
      <FirebaseContext.Provider value={this.state.firebase}>
        <AppWithAuthentication {...this.props} />
      </FirebaseContext.Provider>
    );
  }
}

const AppWithAuthentication = withAuthentication(({ children }) => (
  <Fragment>
    <Navigation />
    <hr />
    {children}
  </Fragment>
));

export default Layout;
