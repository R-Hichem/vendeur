import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button} from 'native-base';

const Sucess = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 30,
      }}>
      <Text style={{fontSize: 20}}>Transaction Enregistré !</Text>
      <Button
        block
        success
        style={{margin: 30}}
        onPress={() => navigation.navigate('Home')}>
        <Text>OK</Text>
      </Button>
    </View>
  );
};

export default Sucess;
