import React, {useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './components/Home';
import Orders from './components/Orders';
import UniqueOrder from './components/UniqueOrder';
import Payment from './components/Payment';
import {AuthContext} from './components/AuthProvider';
import LoginScreen from './components/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {View, ActivityIndicator} from 'react-native';
import Confirm from './components/Confirm';
import Historique from './components/Historique';
import UniqueOrderLogs from './components/UniqueOrderLogs';
import Settings from './components/Settings';

const Stack = createStackNavigator();

const Routes = () => {
  const {user, setUser, login, logout, loading, setLoading} = useContext(
    AuthContext,
  );
  useEffect(() => {
    // check if the user is logged in or not
    AsyncStorage.getItem('user')
      .then(userString => {
        if (userString) {
          // decode it
          // login();
          userObject = JSON.parse(userString);
          setUser(userObject);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <LoginScreen />}
    </NavigationContainer>
  );
};

export default Routes;

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name="Logs"
        component={Historique}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name="UniqueOrder"
        component={UniqueOrder}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name="UniqueOrderLogs"
        component={UniqueOrderLogs}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={{
          header: () => null,
        }}
      />

      {/* <Stack.Screen name="Commandes" component={Commandes} />
      <Stack.Screen name="Methodes" component={Methodes} /> */}
    </Stack.Navigator>
  );
};
