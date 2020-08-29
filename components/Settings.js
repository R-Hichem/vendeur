import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Body, Title, Text, Header, Icon, Button} from 'native-base';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import {AuthContext} from './AuthProvider';

const Settings = ({navigation}) => {
  const {user, logout, setLoading, loading} = useContext(AuthContext);
  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.headerText}> {user.name} </Text>
      </View>
      <Body style={{width: '100%'}}>
        <TouchableOpacity style={styles.homeListContainer}>
          <Button
            block
            Primary
            style={{
              ...styles.orderItem,
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
            onPress={() => {
              setLoading(true);
              logout();
            }}>
            <Text style={{color: '#1C6587', fontWeight: 'bold'}}>
              Deconnexion
            </Text>
          </Button>
        </TouchableOpacity>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1C6587',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    padding: 20,
    marginBottom: 25,
  },

  headerText: {
    fontSize: 32,
    color: '#F8F8F8',
    padding: 25,
  },

  homeItem: {
    backgroundColor: '#333333',
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  homeItemTitle: {
    fontSize: 24,
    padding: 30,
    color: 'white',
    paddingVertical: 50,
  },

  homeListContainer: {
    display: 'flex',
    width: '100%',
    padding: 30,
  },
  orderItem: {
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 30,
    padding: 15,
    paddingHorizontal: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    borderRadius: 5,
    marginHorizontal: 10,
    borderBottomWidth: 4,
    borderBottomEndRadius: 5,
    borderColor: '#1C6587',
  },
});

export default Settings;
