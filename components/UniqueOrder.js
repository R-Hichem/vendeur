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

const UniqueOrder = ({route, navigation}) => {
  const [uniqueOrderError, setUniqueOrderError] = useState(null);
  const [uniqueOrderDetailsLoading, setUniqueOrdderDetailsLoading] = useState(
    true,
  );
  const [uniqueOrder, setUniqueOrder] = useState(null);
  const {order_id} = route.params;
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
        <Spinner color="blue" size={100} />
      </View>
    );
  }
  return (
    <MainScreen
      navigation={navigation}
      order={uniqueOrder}
      orderID={uniqueOrder.id}
    />
  );
};

export default UniqueOrder;

const styles = StyleSheet.create({
  titre: {
    fontSize: 22,
    color: 'white',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const MainScreen = ({navigation, order, orderID}) => {
  return (
    <Container>
      <Header>
        <Body>
          <Text style={styles.titre}>Détaille de Commande</Text>
        </Body>
      </Header>
      <Content>
        <List>
          <ListItem style={styles.listItem}>
            <Text>Ref Commande</Text>
            <Text>{order.code}</Text>
          </ListItem>

          <ListItem style={styles.listItem}>
            <Text>Au nom de</Text>
            <Text>{order.client_name}</Text>
          </ListItem>

          <ListItem style={styles.listItem}>
            <Text>Somme à payer</Text>
            <Text>{order.ammount} DA</Text>
          </ListItem>

          <ListItem style={styles.listItem}>
            <Text>Etat de livraison</Text>
            {order.shipped == true ? (
              <Text style={{color: 'green'}}>Livré</Text>
            ) : (
              <Text style={{color: 'coral'}}>En cours</Text>
            )}
          </ListItem>

          <ListItem style={styles.listItem}>
            <Text>Etat de payement</Text>
            {order.payed == true ? (
              <Text style={{color: 'green'}}>payé</Text>
            ) : (
              <Text style={{color: 'red'}}>Non payé</Text>
            )}
          </ListItem>
        </List>

        {order.payed == false ? (
          <View>
            <Button
              block
              Primary
              style={{margin: 30}}
              onPress={() =>
                navigation.navigate('PaymentOptions', {
                  order_id: orderID,
                  order: order,
                })
              }>
              <Text>Passer Au payement de la commande </Text>
            </Button>
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
          </View>
        ) : null}
      </Content>
    </Container>
  );
};
