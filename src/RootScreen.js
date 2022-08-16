import {View, Text, LogBox} from 'react-native';
import React, {useEffect, useState} from 'react';

import {PermissionsAndroid} from 'react-native';

import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import Geolocation from 'react-native-geolocation-service';
import {v4 as uuid} from 'uuid';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const RootScreen = () => {
  useEffect(() => {
    requestLocation();
    authentication();
  }, []);



  const authentication = () => {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  };

  const dbh = async (latitude, longitude) => {
    try {
      await firestore()
        .collection('Users')
        .doc('HNDAS')
        .set({
          latitude: latitude,
          longitude: longitude,
        })
        .then(() => {
          console.log('User added!');
        });
    } catch (error) {
      console.log(error);
    }
  };

  LogBox.ignoreLogs(['new NativeEventEmitter']);
  LogBox.ignoreAllLogs();

  const renderLocation = () => {
    Geolocation.getCurrentPosition(
      location => {
        const getLatitude = location.coords.latitude;
        const getLongitude = location.coords.longitude;

        dbh(getLatitude, getLongitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        interval: 10000,
        fastestInterval: 5000,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
    // console.log(uuid());
  };

  const loop = () => {
    ReactNativeForegroundService.add_task(
      () => {
        renderLocation();
      },
      {
        delay: 1000,
        onLoop: true,
        taskId: 'taskid',
        onError: e => console.log(`Error logging:`, e),
      },
    );
  };

  const requestLocation = async () => {
    try {
      const backgroundgranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: 'Background Location Permission',
          message:
            'We need access to your location ' +
            'so you can get live quality updates.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'Grant',
        },
      );
      if (backgroundgranted === PermissionsAndroid.RESULTS.GRANTED) {
        //do your thing!
        loop();

        console.log('Granted human being !');
      } else if (backgroundgranted === PermissionsAndroid.RESULTS.DENIED) {
        console.log('denied');
      }
    } catch (error) {
      console.log(error);
    }
  };

  //request the permission before starting the service.

  return (
    <View>
      <Text>RootScreen is on...or off? NIGHT</Text>
    </View>
  );
};

export default RootScreen;
