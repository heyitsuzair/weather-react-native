import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';

export default function CurrentWeather({city, weather}) {
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
        <TextInput
          value={city === '' ? 'Loading...' : city}
          style={styles.input}
          editable={false}
        />
      </View>
      <View>
        <Text style={styles.date} adjustsFontSizeToFit numberOfLines={1}>
          {formattedHour} : {currentMin} {timeOfDay}, {today} - {monthName} -{' '}
          {year}
        </Text>
      </View>
      <View>
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
            width: 200,
            height: 150,
          }}
        />
      </View>
      <View>
        <Text style={styles.weatherText}>{weather.temp} &deg; C</Text>
      </View>
      <View>
        <Text style={styles.weatherText}>{weather.main}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.humwind}>Humidity</Text>
          <Text style={styles.humwind.text}>{weather.humidity}%</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.humwind}>Wind</Text>
          <Text style={styles.humwind.text}>{weather.wind} kmj</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: 'white',
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
  weatherText: {
    fontSize: 30,
    fontWeight: '800',
    color: 'black',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-evenly',
    width: Dimensions.get('window').width,
  },
  humwind: {
    fontSize: 25,
    textAlign: 'center',
    text: {
      fontSize: 22,
      marginTop: 10,
      color: 'black',
    },
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
