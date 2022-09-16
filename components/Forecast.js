import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ForecastCards from './ForecastCards';

export default function Forecast({forecast}) {
  return (
    <View style={styles.parent}>
      {forecast.map((data, index) => {
        return <ForecastCards key={index} forecast={data} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: 'white',
    margin: 20,
    marginBottom: 50,
    borderRadius: 8,
    shadowColor: 'rgb(0 0 0 / 25%)',
    elevation: 5,
    shadowOpacity: 0,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1,
    alignItems: 'center',
  },
});
