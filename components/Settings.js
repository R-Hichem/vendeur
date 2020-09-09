import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {Container, Body, Title, Text, Header, Icon, Button} from 'native-base';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import {AuthContext} from './AuthProvider';
import axios from 'axios';
import {baseURL} from './baseURL';
axios.defaults.baseURL = baseURL;

const Settings = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [informationData, setinformationData] = useState({});
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    axios
      .post('/api/informations')
      .then(response => {
        setinformationData({...response.data});
        console.log({...response.data});
      })
      .catch(error => console.log(error.message));
    setLoading(false);
  }, []);
  return (
    <Container style={{backgroundColor: '#F6F6F9'}}>
      <View style={styles.header}>
        <Text style={styles.headerText}> {user.name} </Text>
      </View>
      <Body>
        <View style={styles.homeListContainer}>
          {loading && informationData === null ? (
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                flex: 1,
                alignContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}>
              <ActivityIndicator />
            </View>
          ) : (
            <InformationItems informationData={informationData} />
          )}
        </View>
      </Body>
    </Container>
  );
};

const InformationItems = ({informationData}) => {
  return (
    <View>
      <View
        style={{
          ...styles.orderItem,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: 350,
        }}>
        <Text style={{color: '#1C6587', fontWeight: 'bold'}}>
          Commandes total :
        </Text>
        <Text style={{color: '#1C6587'}}>{informationData.total_orders}</Text>
      </View>
      <View
        style={{
          ...styles.orderItem,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: 350,
        }}>
        <Text style={{color: '#1C6587', fontWeight: 'bold'}}>
          Commandes payé :
        </Text>
        <Text style={{color: '#1C6587'}}>{informationData.total_payed}</Text>
      </View>
      <View
        style={{
          ...styles.orderItem,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: 350,
        }}>
        <Text style={{color: '#1C6587', fontWeight: 'bold'}}>
          Commandes non payé :
        </Text>
        <Text style={{color: '#1C6587'}}>
          {informationData.total_non_payed}
        </Text>
      </View>
      <View
        style={{
          ...styles.orderItem,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: 350,
        }}>
        <Text style={{color: '#1C6587', fontWeight: 'bold'}}>
          Commandes livré :
        </Text>
        <Text style={{color: '#1C6587'}}>{informationData.total_shipped}</Text>
      </View>
      <View
        style={{
          ...styles.orderItem,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: 350,
        }}>
        <Text style={{color: '#1C6587', fontWeight: 'bold'}}>
          Commandes non livré :
        </Text>
        <Text style={{color: '#1C6587'}}>
          {informationData.total_non_shipped}
        </Text>
      </View>
      <View
        style={{
          ...styles.orderItem,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: 350,
        }}>
        <Text style={{color: '#1C6587', fontWeight: 'bold'}}>
          Transactions éffectuées :
        </Text>
        <Text style={{color: '#1C6587'}}>
          {informationData.total_transactions}
        </Text>
      </View>
    </View>
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
