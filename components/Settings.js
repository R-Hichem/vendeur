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
        <View style={styles.homeListContainer}>
          <Button
            block
            Primary
            style={{margin: 30}}
            onPress={() => {
              setLoading(true);
              logout();
            }}>
            <Text>Deconnexion</Text>
          </Button>
        </View>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1793d1',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    padding: 20,
  },

  headerText: {
    fontSize: 32,
    color: 'white',
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
  },
});

export default Settings;
