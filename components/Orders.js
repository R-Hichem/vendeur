import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, View, ScrollView, ActivityIndicator} from 'react-native';
import {Container, Body, Title, Text, Header, Icon, Spinner} from 'native-base';
import {TouchableOpacity, TextInput} from 'react-native-gesture-handler';
import axios from 'axios';
import {baseURL} from './baseURL';
import {AuthContext} from './AuthProvider';

axios.defaults.baseURL = baseURL;

const Orders = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const [ordersError, setOrderError] = useState(null);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const {user} = useContext(AuthContext);
  axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  useEffect(() => {
    axios
      .get('/api/orders')
      .then(response => {
        setOrdersLoading(false);
        setOrders(response.data.data);
      })
      .catch(error => {
        setOrdersLoading(false);
        console.log('orders Error', error);
      });
  }, []);
  return (
    <Container style={{backgroundColor: '#F6F6F9'}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Commandes</Text>
      </View>
      <Body style={{width: '100%'}}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchBarInput}
            autoFocus={false}
            onChangeText={text => setSearchText(text)}
          />
          <Icon name="search" type="Feather" style={{color: '#1C6587'}} />
        </View>
        {ordersLoading ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: 30,
            }}>
            <Text style={{fontSize: 20}}>Mise à jour des informations ...</Text>
            <Spinner color="#1C6587" size={100} />
          </View>
        ) : (
          <OrdersList
            navigation={navigation}
            orders={orders}
            searchText={searchText}
          />
        )}
      </Body>
    </Container>
  );
};

export default Orders;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1C6587',
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

  orderItem: {
    backgroundColor: 'white',
    marginVertical: 5,
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

  orderItemTitle: {
    color: '#1C6587',
  },

  orderListContainer: {
    display: 'flex',
    width: '100%',
  },

  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  searchBarInput: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    borderColor: '#1C6587',
    borderBottomWidth: 3,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#F6F6F9',
  },
});

const OrderItem = ({
  orderID,
  clientName,
  orderDate,
  orderCode,
  screen,
  navigation,
  status,
}) => {
  return (
    <TouchableOpacity
      style={styles.orderItem}
      onPress={() =>
        navigation.navigate('UniqueOrder', {
          order_id: orderID,
        })
      }>
      <View>
        <Text style={{...styles.orderItemTitle, fontWeight: 'bold'}}>
          {clientName}
        </Text>
        <Text style={styles.orderItemTitle}>{orderCode}</Text>
        <Text style={styles.orderItemTitle}>{orderDate}</Text>
      </View>

      <View>
        <View>
          {status.order ? (
            <Text
              style={{
                ...styles.orderItemTitle,
                color: '#44AF69',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Payé
            </Text>
          ) : (
            <Text
              style={{
                ...styles.orderItemTitle,
                color: '#F8333C',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Non payé
            </Text>
          )}
        </View>
        <View>
          {status.shipping ? (
            <Text
              style={{
                ...styles.orderItemTitle,
                color: '#44AF69',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Livré
            </Text>
          ) : (
            <Text
              style={{
                ...styles.orderItemTitle,
                color: '#F8333C',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              En cours
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SearchBar = () => {
  return (
    <View style={styles.searchBar}>
      <TextInput style={styles.searchBarInput} autoFocus={false} />
      <Icon name="search" type="Feather" style={{color: '#1C6587'}} />
    </View>
  );
};

const OrdersList = ({navigation, orders, searchText}) => {
  let ordersToDisplay = orders;
  if (searchText !== '') {
    ordersToDisplay = orders.filter(order =>
      order.client_name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }
  return (
    <ScrollView style={styles.orderListContainer}>
      {ordersToDisplay.length > 0 ? (
        ordersToDisplay.map((order, index) => {
          return (
            <OrderItem
              orderID={order.id}
              orderCode={order.code}
              clientName={order.client_name}
              orderDate={order.created_at}
              status={{
                order: order.payed,
                shipping: order.shipped,
              }}
              navigation={navigation}
              key={order.id}
            />
          );
        })
      ) : (
        <Text
          style={{
            color: '#F8333C',
            fontWeight: 'bold',
            fontSize: 24,
            textAlign: 'center',
            padding: 20,
          }}>
          {' '}
          Aucune commande ne corresponds a votre recherche
        </Text>
      )}
    </ScrollView>
  );
};
