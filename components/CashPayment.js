import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Text,
  Body,
  Form,
  Item,
  Input,
  Button,
  Spinner,
} from 'native-base';

import {baseURL} from './baseURL';
import {AuthContext} from './AuthProvider';
import axios from 'axios';

axios.defaults.baseURL = baseURL;

const CashPayment = ({route, navigation}) => {
  const [montantArendre, setMontantArendre] = useState(null);
  const [montant, setMontant] = useState(null);
  const [clientName, setClientName] = useState('');
  const [loading, setLoading] = useState(false);
  const {order_id, order} = route.params;
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: 30,
        }}>
        <Text style={{fontSize: 20}}>Traitement en cours ...</Text>
        <Spinner color="blue" size={100} />
      </View>
    );
  }
  return (
    <Container>
      <Header>
        <Body>
          <Text style={styles.titre}>Payement Par Liquide</Text>
        </Body>
      </Header>
      <Content>
        <Form style={{padding: 30}}>
          <Item>
            <Input
              placeholder="Nom du client"
              style={{margin: 10}}
              onChangeText={text => {
                setClientName(text);
              }}
            />
          </Item>
          <Item last>
            <Input
              placeholder="Montant Reçu"
              style={{margin: 10}}
              keyboardType="numeric"
              onChangeText={montant => {
                setMontantArendre(parseFloat(montant) - order.ammount);
                setMontant(parseFloat(montant));
              }}
            />
          </Item>
        </Form>
        {montantArendre !== null ? (
          parseFloat(montantArendre) >= 0 ? (
            <View>
              <Text>Montant a rendre : {montantArendre}</Text>
              <Button
                block
                onPress={() => {
                  setLoading(true);
                  axios
                    .post('api/orderswithjson/' + order_id, {
                      details: JSON.stringify({
                        type: 'liquide',
                        detail: {
                          montan_a_payer: parseFloat(order.ammount),
                          montan_recu: parseFloat(montant),
                          montant_rendu: parseFloat(montantArendre),
                        },
                      }),
                    })
                    .then(response => {
                      setLoading(false);
                      navigation.navigate('Sucess');
                    })
                    .catch(error => {
                      setLoading(false);
                      console.log(error.message);
                      navigation.navigate('ErrorOccured');
                    });
                }}>
                <Text>Confirmer</Text>
              </Button>
            </View>
          ) : (
            <Text>Montant Inssufissant </Text>
          )
        ) : null}
      </Content>
    </Container>
  );
};

export default CashPayment;

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
