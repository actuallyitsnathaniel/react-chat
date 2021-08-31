import React from 'react';
import {View} from 'react-native';

import {TextField, Button} from '../components/Form';
import firebase from 'react-native-firebase';

////////////////////////////////
// Create New Message Threads //
////////////////////////////////

export default class NewThread extends React.Component {
  state = {
    name: '',
    loading: false,
  };

  handlePress = () => {
    // prevents nameless threads
    if (this.state.name.length > 0) {
      this.setState({loading: true}, () => {
        // Creation of thread!
        firebase
          .firestore()
          .collection('MESSAGE_THREADS')
          .add({
            name: this.state.name,
            latestMessage: {
              text: `${this.state.name} created.`,
              createdAt: new Date().getTime(),
            },
          })
          .then(() => {
            // Sends user back to threads
            this.props.navigation.pop();
          })
          .finally(() => {
            // No matter what, loading state ends here
            this.setState({loading: false});
          });
      });
    }
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TextField
          placeholder="Thread Name"
          onChangeText={name => this.setState({name})}
        />
        <Button
          onPress={this.handlePress}
          title="Create"
          disabled={this.state.loading}
        />
      </View>
    );
  }
}
