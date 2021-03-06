import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Body,
  Button,
  Spinner,
} from 'native-base';
import {baseURL} from './baseURL';
import {AuthContext} from './AuthProvider';
import axios from 'axios';
axios.defaults.baseURL = baseURL;

const UniqueOrderLogs = ({route, navigation}) => {
  const [uniqueOrderError, setUniqueOrderError] = useState(null);
  const [uniqueOrderDetailsLoading, setUniqueOrdderDetailsLoading] = useState(
    true,
  );
  const [uniqueOrder, setUniqueOrder] = useState(null);
  const {order_id, payed_at} = route.params;
  useEffect(() => {
    axios
      .get('/api/orders/' + order_id)
      .then(response => {
        const order = {
          id: response.data.data.id,
          code: response.data.data.code,
          client_name: response.data.data.client_name,
          ammount: response.data.data.ammount,
          payed: response.data.data.payed,
          shipped: response.data.data.shipped,
          created_at: response.data.data.created_at,
          updated_at: response.data.data.updated_at,
        };
        setUniqueOrder(order);
        setUniqueOrdderDetailsLoading(false);
      })
      .catch(error => {
        setUniqueOrderError(error);
        setUniqueOrdderDetailsLoading(false);
      });
  }, []);
  if (uniqueOrderDetailsLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: 30,
        }}>
        <Text style={{fontSize: 20}}>Chargement des données ...</Text>
        <Spinner color="#1C6587" size={100} />
      </View>
    );
  }
  return (
    <MainScreen
      navigation={navigation}
      order={uniqueOrder}
      orderID={uniqueOrder.id}
      payed_at={payed_at}
    />
  );
};

export default UniqueOrderLogs;

const styles = StyleSheet.create({
  titre: {
    fontSize: 20,
    color: 'white',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#1C6587',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    padding: 20,
    marginBottom: 15,
  },

  headerText: {
    fontSize: 29,
    color: 'white',
  },
  orderDetailItem: {
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
});

const MainScreen = ({navigation, order, orderID, payed_at}) => {
  return (
    <Container style={{backgroundColor: '#F6F6F9'}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Détails de la commande</Text>
      </View>
      <Content>
        <List>
          <ListItem style={styles.orderDetailItem}>
            <Text>Ref </Text>
            <Text>{order.code}</Text>
          </ListItem>

          <ListItem style={styles.orderDetailItem}>
            <Text>Au nom de</Text>
            <Text>{order.client_name}</Text>
          </ListItem>

          <ListItem style={styles.orderDetailItem}>
            <Text>Somme payée</Text>
            <Text>{order.ammount} DA</Text>
          </ListItem>

          <ListItem style={styles.orderDetailItem}>
            <Text>Etat de livraison</Text>
            {order.shipped == true ? (
              <Text style={{color: '#44AF69'}}>Livré</Text>
            ) : (
              <Text style={{color: '#F8333C'}}>En cours</Text>
            )}
          </ListItem>

          <ListItem style={styles.orderDetailItem}>
            <Text>Payée le : </Text>
            <Text>
              {payed_at
                .split('-')
                .reverse()
                .join('/')}
            </Text>
          </ListItem>
        </List>

        {order.payed == false ? (
          <Button
            block
            Primary
            style={{margin: 30}}
            onPress={() =>
              navigation.navigate('Payment', {
                order_id: orderID,
              })
            }>
            <Text>Passer Au payement</Text>
          </Button>
        ) : null}
      </Content>
    </Container>
  );
};
