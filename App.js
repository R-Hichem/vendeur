import React from 'react';
import {AuthProvider} from './components/AuthProvider';
import Routes from './Routes';
import AsyncStorage from '@react-native-community/async-storage';

//AsyncStorage.removeItem('user');
const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
