import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CurrentWeather from '../components/CurrentWeather';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';
import axios from 'axios';

export default function Home() {
  const [location, setLocation] = useState({
    lat: '',
    lon: '',
  });

  const [city, setCity] = useState('');

  //getting city using location iq api
  const getCity = async (latitude, longitude) => {
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
          <CurrentWeather location={location} city={city} />
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
