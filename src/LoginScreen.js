import React, {useState} from 'react';
import {Image, StyleSheet, View, ScrollView} from 'react-native';
import * as Yup from 'yup';

import FormField from './Components/Forms/FormField';
import SubmitButton from './Components/SubmitBtn';
import Form from './Components/Forms/Form';
import AppText from './Components/AppText';
import auth from '@react-native-firebase/auth';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

export default function LoginScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const submitUser = value => {
    const email = Object.values(value)[0];
    const password = Object.values(value)[1];
    setRefreshing(true);

    LoginUser(email, password);
  };

  const LoginUser = async (email, password) => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        setRefreshing(false);
        console.log('User account signed in!');
        // console.log(LoginUser.uid);
        // console.log(data.user.uid);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.login}>Login</AppText>
      <Form
        initialValues={{email: '', password: ''}}
        onSubmit={submitUser}
        validationSchema={validationSchema}>
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          name="password"
          secureTextEntry
          placeholder="Password"
          textContentType="password"
        />
        <View style={styles.button}>
          <SubmitButton title="login" />
        </View>
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 250,
    height: 60,
    // top: -10,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  container: {
    backgroundColor: '#000000',
    // flex: 1,
  },
  login: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 35,
    marginTop: 15,
    marginBottom: 10,
  },
  button: {
    marginTop: 25,
  },
});
