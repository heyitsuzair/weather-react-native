import {View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import CurrentWeather from '../components/CurrentWeather';

export default function Home() {
  return (
    <View>
      <ScrollView>
        <View style={styles.main}>
          <CurrentWeather />
          <CurrentWeather />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
