import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CurrentWeather from '../components/CurrentWeather';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform, BackHandler, Alert} from 'react-native';
import axios from 'axios';
import Forecast from '../components/Forecast';

export default function Home() {
  // state for forecast info
  const [forecast, setForecast] = useState([]);

  // state for weather info
  const [weather, setWeather] = useState({
    temp: '',
    main: '',
    wind: '',
    humidity: '',
    icon: '',
  });

  // location state to set longitude and latitude
  const [location, setLocation] = useState({
    lat: '',
    lon: '',
  });
  // loading state for getting location
  const [loading, setLoading] = useState(true);

  // city state
  const [city, setCity] = useState('');

  // getting weather info
  const getWeather = async (lat, lon) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0585d63af5210e9a1f194fac36d7b816`;
      await axios.get(url).then(res => {
        setWeather({
          temp: Math.ceil(res.data.main.temp - 273),
          main: res.data.weather[0].main,
          wind: res.data.wind.speed,
          humidity: res.data.main.humidity,
          icon: res.data.weather[0].icon,
        });
        setLoading(false);
      });
    } catch (error) {
      console.warn(error);
      //   show the alert
      Alert.alert(
        'Error',
        'Something Went Wrong. Please Check Your Internet Connection And Try Again!',
        [
          {
            text: 'Exit',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  };

  //getting city using location iq api
  const getCity = async (latitude, longitude) => {
    try {
      const url =
        ' https://us1.locationiq.com/v1/reverse.php?key=pk.ef3482bef6f9010dc39b00224fd95bef&lat=' +
        latitude +
        '&lon=' +
        longitude +
        '&format=json';
      await axios.get(url).then(res => {
        const city = res.data.address.city;
        setCity(city);
      });
    } catch (error) {
      // show the alert
      Alert.alert(
        'Error',
        'Something Went Wrong. Please Check Your Internet Connection!',
        [
          {
            text: 'Exit',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  };
  // getting forecast info
  const getForecast = async (latitudeIncome, longitudeIncome) => {
    try {
      const url = `https://api.weatherapi.com/v1/forecast.json?key=cdac4295cfeb4d67979101632222207&q=${latitudeIncome},${longitudeIncome}&days=3&aqi=no&alerts=no`;
      await axios.get(url).then(res => {
        setForecast(res.data.forecast.forecastday);
      });
    } catch (error) {
      console.warn(error);
      //   show the alert
      Alert.alert(
        'Error',
        'Something Went Wrong. Please Check Your Internet Connection And Try Again!',
        [
          {
            text: 'Exit',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  };

  // getting location
  const getLocation = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
        .then(res => {
          // if location permession is granted run the following code
          if (res === 'granted') {
            Geolocation.getCurrentPosition(data => {
              setLocation({
                lat: data.coords.latitude,
                lon: data.coords.longitude,
              });
              getCity(data.coords.latitude, data.coords.longitude);
              getWeather(data.coords.latitude, data.coords.longitude);
              getForecast(data.coords.latitude, data.coords.longitude);
            });
          } else if (res === 'denied') {
            // if location permession is denied run the following code
            getLocation();
          } else {
            alert('Please Allow Location From Settings To Continue!');
          }
        })
        .catch(res => {
          alert('Something Went Wrong!');
        });
    } else {
      Geolocation.getCurrentPosition(data => {
        setLocation({lat: data.coords.latitude, lon: data.coords.longitude});
        getCity(data.coords.latitude, data.coords.longitude);
        getWeather(data.coords.latitude, data.coords.longitude);
        getForecast(data.coords.latitude, data.coords.longitude);
      });
    }
  };

  useEffect(() => {
    getLocation();
    //eslint-disable-next-line
  }, []);

  return (
    <View>
      <ScrollView>
        <View style={styles.main}>
          {loading === true ? (
            <View style={styles.loader}>
              <ActivityIndicator color="red" size={80} />
            </View>
          ) : (
            <>
              <CurrentWeather weather={weather} city={city} />
              <Forecast forecast={forecast} />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
  },
});
