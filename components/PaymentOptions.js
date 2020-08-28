import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  Container,
  Header,
  Content,
  Text,
  Body,
  Button,
  Card,
  CardItem,
  Spinner,
} from 'native-base';

const PaymentOptions = ({route, navigation}) => {
  const {order_id, order} = route.params;
  return (
    <Container>
      <Header>
        <Body>
          <Text style={styles.titre}>Options de Payement</Text>
        </Body>
      </Header>
      <Content>
        <Button
          block
          Primary
          style={{margin: 40}}
          onPress={() =>
            navigation.navigate('Payment', {
              order_id: order_id,
            })
          }>
          <Text>QR Code</Text>
        </Button>
        <Button
          block
          Primary
          style={{margin: 40}}
          onPress={() =>
            navigation.navigate('CashPayment', {
              order_id: order_id,
              order: order,
            })
          }>
          <Text>Liquide</Text>
        </Button>
        <Button
          block
          Primary
          style={{margin: 40}}
          onPress={() =>
            navigation.navigate('Cheque', {
              order_id: order_id,
              order: order,
            })
          }>
          <Text>Cheque</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default PaymentOptions;

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
