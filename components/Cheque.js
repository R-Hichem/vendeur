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

const Cheque = ({route, navigation}) => {
  const [clientName, setClientName] = useState('');
  const [numeroCompte, setNumeroCompte] = useState('');
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
        <Spinner color="#1C6587" size={100} />
      </View>
    );
  }
  return (
    <Container style={{backgroundColor: '#F6F6F9'}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Paiement par chèque{' '}
          <Icon name="edit-3" type="Feather" style={{color: 'white'}} />{' '}
        </Text>
      </View>
      <Content>
        <Form style={{padding: 30}}>
          <Item style={styles.inputStyle}>
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
              placeholder="Numero compte"
              keyboardType="numeric"
              style={{margin: 10}}
              onChangeText={text => {
                setNumeroCompte(text);
              }}
            />
          </Item>
        </Form>

        <View>
          <Button
            block
            style={{
              margin: 40,
              backgroundColor: '#1C6587',
              borderRadius: 8,
            }}
            onPress={() => {
              setLoading(true);
              axios
                .post('api/orderswithjson/' + order_id, {
                  details: JSON.stringify({
                    type: 'chèque',
                    detail: {
                      clientName,
                      numeroCompte,
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
            <Text style={{fontWeight: 'bold'}}> Confirmer </Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

export default Cheque;

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
