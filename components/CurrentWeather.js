import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function CurrentWeather() {
  return (
    <View style={styles.parent}>
      <View>
        <Text>Your City:</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: 'white',
    flex: 1,
    margin: 20,
    borderRadius: 8,
    shadowColor: 'rgb(0 0 0 / 25%)',
    elevation: 5,
    shadowOpacity: 0,
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
  },
});
