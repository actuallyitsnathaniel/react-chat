import React from 'react';
import firebase from 'react-native-firebase';
import {uniqueNamesGenerator} from 'unique-names-generator';

export default class Initializing extends React.Component {
  ////////////////////////////////
  // Anonymous Firebase Authentication
  ////////////////////////////
  componentDidMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged(authUser => {
      // check if user exists or not
      if (!authUser) {
        // if user doesn't exist, create anonymous thing & give random name
        return firebase
          .auth()
          .signInAnonymously()
          .then(({user}) => {
            user.updateProfile({displayName: uniqueNamesGenerator()});
          });
      }

      console.log('user', authUser);
      //Navigate to Messaging page
      return this.props.navigation.navigate('Messaging');
    });
  }

  componentWillMount() {
    // if method exists
    if (this.removeAuthListener) {
      this.removeAuthListener(); // execute the method
    }
  }

  render() {
    return null;
  }
}
