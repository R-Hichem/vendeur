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
  Icon,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

const PaymentOptions = ({route, navigation}) => {
  const {order_id, order} = route.params;
  return (
    <Container style={{backgroundColor: '#F6F6F9'}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Options de paiement</Text>
      </View>
      <Content>
        <Body style={{width: '100%'}}>
          <View style={styles.homeListContainer}>
            <HomeItem
              title="Code QR"
              icon="qrcode"
              iconFamily="FontAwesome"
              screen="Payment"
              navigation={navigation}
              order={order}
              order_id={order_id}
            />
            <HomeItem
              title="Liquide"
              icon="dollar-sign"
              screen="CashPayment"
              navigation={navigation}
              order={order}
              order_id={order_id}
            />
            <HomeItem
              title="Chèque"
              icon="edit-3"
              screen="Cheque"
              navigation={navigation}
              order={order}
              order_id={order_id}
            />
          </View>
        </Body>
        {/* <Button
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
        </Button> */}
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
    flexDirection: 'column',
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
    padding: 10,
    height: 120,
    width: 160,
  },
});

const HomeItem = ({
  title,
  icon,
  screen,
  navigation,
  iconFamily,
  order,
  order_id,
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
      onPress={() =>
        navigation.navigate(screen, {
          order_id: order_id,
          order: order,
        })
      }>
      <View style={styles.homeCard}>
        <Text style={styles.homeItemTitle}> {title}</Text>
        <Icon
          name={icon}
          type={iconFamily ? iconFamily : 'Feather'}
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
