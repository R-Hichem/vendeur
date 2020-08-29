import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button, Icon} from 'native-base';

const Sucess = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 30,
        paddingVertical: 100,
        backgroundColor: '#E6E6E6',
      }}>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: '#1C6587'}}>
        Transaction Enregistré !
      </Text>
      <Icon
        name="check-circle"
        type="FontAwesome"
        style={{color: '#44AF69', fontSize: 150}}
      />
      <View>
        <Button
          block
          style={{
            backgroundColor: '#1C6587',
            borderRadius: 8,
            width: 200,
          }}
          onPress={() => navigation.navigate('Home')}>
          <Text style={{fontWeight: 'bold'}}> OK </Text>
        </Button>
      </View>
    </View>
  );
};

export default Sucess;
