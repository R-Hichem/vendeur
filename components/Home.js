import React, {useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Body, Title, Text, Header, Icon, Button} from 'native-base';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import {AuthContext} from './AuthProvider';
import Echo from 'laravel-echo';
import {baseURL} from './baseURL';
import Pusher from 'pusher-js/react-native';

Pusher.logToConsole = true;

const Home = ({navigation}) => {
  const {user, logout, setLoading, loading} = useContext(AuthContext);
  // const echo = new Echo({
  //   broadcaster: 'pusher',
  //   key: 'ABCDEFG',
  //   cluster: 'mt1',
  //   wsHost: '192.168.8.103',
  //   wsPort: 6001,
  // });

  // const pusherConfig = {
  //   appId: '12345',
  //   key: 'ABCDEFG',
  //   secret: 'HIJKLMNOP',
  //   cluster: 'mt1',
  //   wsHost: 'e12e8d3eceee.ngrok.io',
  //   wsPort: 6001,
  //   logToConsole: true,
  //   encrypted: true,
  // };

  // let pusher = new Pusher(pusherConfig.key, pusherConfig);
  // pusher.connection.bind('state_change', function(states) {
  //   console.log('Channels current state is ' + states.current);
  // });

  // pusher.connection.bind('initialized', () =>
  //   console.log('PusherClient::initialized', arguments),
  // );
  // pusher.connection.bind('connecting', () =>
  //   console.log('PusherClient::connecting', arguments),
  // );
  // pusher.connection.bind('connected', () =>
  //   console.log('PusherClient::connected', arguments),
  // );
  // pusher.connection.bind('error', () =>
  //   console.log('PusherClient::error', arguments),
  // );
  // pusher.connection.bind('unavailable', () =>
  //   console.log('PusherClient::unavailable', arguments),
  // );
  // pusher.connection.bind('failed', () =>
  //   console.log('PusherClient::failed', arguments),
  // );
  // pusher.connection.bind('disconnected', () =>
  //   console.log('PusherClient::disconnected', arguments),
  // );

  // let echo = new Echo({
  //   broadcaster: 'pusher',
  //   client: pusher,
  // });

  // echo.channel('transactions').listen('TransactionSuccess', e => {
  //   console.log(e.message);
  // });
  // useEffect(() => {}, []);

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.headerText}> {user.name} </Text>
      </View>
      <Body style={{width: '100%'}}>
        <View style={styles.homeListContainer}>
          <HomeItem
            title="Commandes"
            icon="align-left"
            screen="Orders"
            navigation={navigation}
          />
          <HomeItem
            title="Historique"
            icon="file-text"
            screen="Logs"
            navigation={navigation}
          />
          <HomeItem
            title="Paramètres"
            icon="sliders"
            screen="Settings"
            navigation={navigation}
          />
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

export default Home;

const HomeItem = ({title, icon, screen, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.homeItem}
      onPress={() => navigation.navigate(screen)}>
      <Text style={styles.homeItemTitle}>{title}</Text>
      <Text style={styles.homeItemTitle}>
        <Icon name={icon} type="Feather" style={{color: 'white'}} />
      </Text>
    </TouchableOpacity>
  );
};
