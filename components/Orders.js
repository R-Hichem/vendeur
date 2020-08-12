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
    <Container>
      <View style={styles.header}>
        <Text style={styles.headerText}>Commandes</Text>
      </View>
      <Body style={{width: '100%'}}>
        <SearchBar />
        {ordersLoading ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: 30,
            }}>
            <Text style={{fontSize: 20}}>Mise à jour des informations ...</Text>
            <Spinner color="blue" size={100} />
          </View>
        ) : (
          <OrdersList navigation={navigation} orders={orders} />
        )}
      </Body>
    </Container>
  );
};

export default Orders;

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

  orderItem: {
    backgroundColor: '#333333',
    marginVertical: 5,
    padding: 15,
    paddingHorizontal: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  orderItemTitle: {
    color: 'white',
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
    paddingVertical: 15,
  },

  searchBarInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 30,
    margin: 10,
    borderColor: '#333333',
    borderWidth: 3,
    textAlign: 'center',
    fontSize: 20,
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
        <Text style={styles.orderItemTitle}>{clientName}</Text>
        <Text style={styles.orderItemTitle}>{orderCode}</Text>
        <Text style={styles.orderItemTitle}>{orderDate}</Text>
      </View>

      <View>
        <View>
          {status.order ? (
            <Text
              style={{
                ...styles.orderItemTitle,
                color: 'green',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Payé
            </Text>
          ) : (
            <Text
              style={{
                ...styles.orderItemTitle,
                color: 'coral',
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
                color: 'green',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Livré
            </Text>
          ) : (
            <Text
              style={{
                ...styles.orderItemTitle,
                color: 'coral',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              En cours
            </Text>
          )}
        </View>
      </View>

      <Text style={styles.orderItemTitle}>
        <Icon name="alert-circle" type="Feather" style={{color: 'white'}} />
      </Text>
    </TouchableOpacity>
  );
};

const SearchBar = () => {
  return (
    <View style={styles.searchBar}>
      <TextInput style={styles.searchBarInput} autoFocus={false} />
      <Icon name="search" type="Feather" style={{color: '#333333'}} />
    </View>
  );
};

const OrdersList = ({navigation, orders}) => {
  return (
    <ScrollView style={styles.orderListContainer}>
      {orders.map(order => {
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
      })}
    </ScrollView>
  );
};
