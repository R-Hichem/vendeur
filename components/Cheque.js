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
          <Item>
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
        <Button
          block
          onPress={() => {
            setLoading(true);
            axios
              .post('api/orderswithjson/' + order_id, {
                details: JSON.stringify({
                  type: 'liquide',
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
          <Text>Confirmer</Text>
        </Button>
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
});