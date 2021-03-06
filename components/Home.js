import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Container,
  Body,
  Title,
  Text,
  Header,
  Icon,
  Button,
  Spinner,
} from 'native-base';
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
  const {user, logout} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: 30,
        }}>
        <Text style={{fontSize: 20}}>Déconnexion ...</Text>
        <Spinner color="#1C6587" size={100} />
      </View>
    );
  }
  return (
    <Container style={{backgroundColor: '#F6F6F9'}}>
      <View style={styles.header}>
        <Text style={styles.headerText}> {user.name} </Text>
      </View>
      <Body style={{width: '100%', paddingVertical: 50, paddingBottom: 100}}>
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
        </View>
        <View style={styles.homeListContainer}>
          <HomeItem
            title="Informations"
            icon="md-information-circle-outline"
            screen="Settings"
            iconFamily="FontAwsome5"
            navigation={navigation}
          />
          <HomeButton
            title="Déconnexion"
            icon="power-off"
            onPress={() => {
              setLoading(true);
              logout();
            }}
          />
        </View>
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
    //backgroundColor: '#1C6587',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    //flexGrow: 1,
    margin: 10,
  },

  homeItemTitle: {
    fontSize: 20,
    //color: 'white',
    color: '#1C6587',
    fontWeight: 'bold',
  },

  homeListContainer: {
    display: 'flex',
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flex: 1,
  },
  homeCard: {
    display: 'flex',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    height: 160,
    width: 140,
  },
});

export default Home;

const HomeItem = ({
  title,
  icon,
  screen,
  navigation,
  iconFamily = 'Feather',
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.homeItem,
        flexDirection: 'column',
        alignItems: 'flex-end',
        borderRadius: 15,
        borderWidth: 7,
        borderColor: '#1C6587',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8,
      }}
      onPress={() => navigation.navigate(screen)}>
      <View style={styles.homeCard}>
        <Text style={styles.homeItemTitle}> {title}</Text>
        <Icon
          name={icon}
          type={iconFamily}
          style={{
            color: 'white',
            fontSize: 50,
            color: '#1C6587',
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const HomeButton = ({title, icon, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.homeItem,
        flexDirection: 'column',
        alignItems: 'flex-end',
        borderRadius: 15,
        borderWidth: 7,
        borderColor: '#1C6587',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8,
      }}
      onPress={onPress}>
      <View style={styles.homeCard}>
        <Text style={styles.homeItemTitle}>{title}</Text>
        <Icon
          name={icon}
          type="FontAwesome5"
          style={{
            color: 'white',
            fontSize: 50,
            color: '#1C6587',
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
