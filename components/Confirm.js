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

const Confirm = ({route, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [hasError, setHasError] = useState(false);
  const {order_id} = route.params;
  useEffect(() => {
    if (!done) {
      axios
        .post('/api/orders/' + order_id)
        .then(response => {
          setLoading(false);
          setDone(true);
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
          setDone(true);
          setHasError(true);
        });
    }
  }, []);
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: 30,
        }}>
        <Text style={{fontSize: 20}}>Traitement de la requète ...</Text>
        <Spinner color="blue" size={100} />
      </View>
    );
  }
  if (hasError) {
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 30,
      }}>
      <Text style={{fontSize: 20}}>Echec lors du traitement de la requète</Text>
      <Button
        block
        danger
        style={{margin: 30}}
        onPress={() => navigation.goBack()}>
        <Text>OK</Text>
      </Button>
    </View>;
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 30,
      }}>
      <Text style={{fontSize: 20}}>Transaction Enregistré !</Text>
      <Button
        block
        success
        style={{margin: 30}}
        onPress={() => navigation.navigate('Home')}>
        <Text>OK</Text>
      </Button>
    </View>
  );
};

export default Confirm;

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
