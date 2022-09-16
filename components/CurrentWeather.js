import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';

export default function CurrentWeather({city}) {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes().toLocaleString();
  const today = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const currentMin = (minutes < 10 ? '0' : '') + minutes;

  let monthName = '';
  switch (month) {
    case 1:
      monthName = 'January';
      break;
    case 2:
      monthName = 'February';
      break;
    case 3:
      monthName = 'March';
      break;
    case 4:
      monthName = 'April';
      break;
    case 5:
      monthName = 'May';
      break;
    case 6:
      monthName = 'June';
      break;
    case 7:
      monthName = 'July';
      break;
    case 8:
      monthName = 'August';
      break;
    case 9:
      monthName = 'September';
      break;
    case 10:
      monthName = 'October';
      break;
    case 11:
      monthName = 'November';
      break;
    case 12:
      monthName = 'December';
      break;
  }

  const timeOfDay = date.getHours() < 12 ? 'AM' : 'PM';

  const formattedHour = hour > 12 ? hour - 12 : hour;

  return (
    <View style={styles.parent}>
      <View style={styles.city}>
        <Text style={styles.text}>Your City:</Text>
        <TextInput value={city} style={styles.input} editable={false} />
      </View>
      <View>
        <Text style={styles.date}>
          {formattedHour} : {currentMin} {timeOfDay}, {today} - {monthName} -{' '}
          {year}
        </Text>
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
  text: {
    marginRight: 10,
    fontSize: 20,
    fontWeight: '700',
  },
  date: {
    fontSize: 20,
  },
  city: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  input: {
    borderColor: '#e6e3e3',
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 30,
    paddingLeft: 30,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 4,
    color: 'black',
    fontSize: 20,
  },
});
