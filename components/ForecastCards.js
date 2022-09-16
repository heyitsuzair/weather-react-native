import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';

export default function ForecastCards({forecast}) {
  let day = '';
  let date = new Date();
  var today = date.getDay();
  var daylist = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday ',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  //eslint-disable-next-line
  switch (new Date(forecast.date).getDay()) {
    case 0:
      day = 'Sunday';
      break;
    case 1:
      day = 'Monday';
      break;
    case 2:
      day = 'Tuesday';
      break;
    case 3:
      day = 'Wednesday';
      break;
    case 4:
      day = 'Thursday';
      break;
    case 5:
      day = 'Friday';
      break;
    case 6:
      day = 'Saturday';
  }
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: daylist[today] === day ? '#6b9dfa' : '',
        },
      ]}>
      <Text
        style={[
          styles.text,
          {
            color: daylist[today] === day ? 'white' : 'black',
          },
        ]}>
        {daylist[today] === day ? 'Today' : day}
      </Text>
      <Image
        source={{
          uri: 'https:' + forecast.day.condition.icon,
          width: 200,
          height: 150,
        }}
        style={styles.img}
      />

      <View style={styles.row}>
        <Text
          style={[
            styles.text,
            {
              color: daylist[today] === day ? 'white' : 'black',
              fontWeight: 'bold',
            },
          ]}>
          Max Temp
        </Text>
        <Text
          style={[
            styles.text,
            {
              color: daylist[today] === day ? 'white' : 'black',
            },
          ]}>
          {forecast.day.maxtemp_c}&deg; C
        </Text>
        <Text
          style={[
            styles.text,
            {
              color: daylist[today] === day ? 'white' : 'black',
              fontWeight: 'bold',
            },
          ]}>
          Min Temp
        </Text>
        <Text
          style={[
            styles.text,
            {
              color: daylist[today] === day ? 'white' : 'black',
            },
          ]}>
          {forecast.day.mintemp_c}&deg; C
        </Text>
      </View>
      <Text
        style={[
          styles.text,
          {
            color: daylist[today] === day ? 'white' : 'black',
            fontWeight: 'bold',
          },
        ]}>
        Average Humidtiy
      </Text>
      <Text
        style={[
          styles.text,
          {
            color: daylist[today] === day ? 'white' : 'black',
          },
        ]}>
        {forecast.day.avghumidity}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 50,
    paddingBottom: 50,
    borderRadius: 8,
    width: Dimensions.get('window').width - 100,
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 20,
  },
  img: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 50,
    justifyContent: 'space-evenly',
    width: Dimensions.get('window').width - 100,
  },
});
