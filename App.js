/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Home from './views/Home';

const App = () => {
  return (
    <View style={styles.body}>
      <Home />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#e8e9eb',
    height: Dimensions.get('window').height,
  },
});

export default App;
