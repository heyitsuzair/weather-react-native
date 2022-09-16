import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';

export default function CurrentWeather({location, city}) {
  const [weather, setWeather] = useState({
    temp: '',
    main: '',
    wind: '',
    humidity: '',
    icon: '',
  });

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

  // getting weather info
  const getWeather = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=0585d63af5210e9a1f194fac36d7b816`;
      await axios.get(url).then(res => {
        setWeather({
          temp: Math.ceil(res.data.main.temp - 273),
          main: res.data.weather[0].main,
          wind: res.data.wind.speed,
          humidity: res.data.main.humidity,
          icon: res.data.weather[0].icon,
        });
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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
