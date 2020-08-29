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
  Icon,
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
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Paiement par liquide{' '}
          <Icon name="dollar-sign" type="Feather" style={{color: 'white'}} />{' '}
        </Text>
      </View>
      <Content>
        <Form style={styles.formTag}>
          <Item style={styles.inputStyle} success>
            <Input
              placeholder="Nom du client"
              style={{margin: 10}}
              onChangeText={text => {
                setClientName(text);
              }}
            />
          </Item>
          <Item style={styles.inputStyle}>
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
              <Text
                style={{
                  textAlign: 'center',
                  paddingVertical: 30,
                  fontWeight: 'bold',
                }}>
                Montant a rendre :{' '}
                <Text style={{color: '#44AF69'}}>{montantArendre}</Text> DZD
              </Text>
              <View>
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
                  }}
                  style={{
                    margin: 40,
                    backgroundColor: '#1C6587',
                    borderRadius: 8,
                  }}>
                  <Text style={{fontWeight: 'bold'}}> Confirmer </Text>
                </Button>
              </View>
            </View>
          ) : (
            <Text
              style={{
                textAlign: 'center',
                paddingVertical: 30,
                fontWeight: 'bold',
                color: '#F8333C',
              }}>
              Montant Inssufissant{' '}
            </Text>
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
  header: {
    backgroundColor: '#1C6587',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    padding: 20,
  },

  headerText: {
    fontSize: 23,
    color: '#F8F8F8',
    padding: 25,
  },
  inputStyle: {
    borderRadius: 5,
    marginHorizontal: 20,
    borderBottomWidth: 4,
    borderBottomEndRadius: 5,
    borderColor: '#1C6587',
    width: '90%',
    padding: 10,
  },

  formTag: {
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
});
