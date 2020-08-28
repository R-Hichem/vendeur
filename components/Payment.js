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
  List,
  ListItem,
  Text,
  Body,
  Button,
  Card,
  CardItem,
  Spinner,
} from 'native-base';

import {baseURL} from './baseURL';
import {AuthContext} from './AuthProvider';
import axios from 'axios';
import Pusher from 'pusher-js/react-native';

Pusher.logToConsole = true;
axios.defaults.baseURL = baseURL;

const Payment = ({route, navigation}) => {
  const [qr, setQr] = useState(false);
  const [ready, setReady] = useState(false);
  const [qrImage, setQrImage] = useState(null);
  const {order_id} = route.params;

  useEffect(() => {
    var pusher = new Pusher('5b69251d720b9bf9763b', {
      cluster: 'eu',
    });

    var channel = pusher.subscribe('transactions-channel');
    channel.bind('transactions-event', function(data) {
      // alert(JSON.stringify(data));
      navigation.navigate('Sucess');
      pusher.disconnect();
    });
  }, []);

  return (
    <Container>
      <Header>
        <Body>
          <Text style={styles.titre}>Payement Par Code QR</Text>
        </Body>
      </Header>
      <Content>
        {qr ? (
          <Card>
            <CardItem
              cardBody
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                flex: 1,
              }}>
              {ready ? (
                <Image
                  source={{
                    //uri: 'https://pngimg.com/uploads/qr_code/qr_code_PNG2.png',
                    uri: qrImage,
                  }}
                  style={{height: 400, flex: 1}}
                />
              ) : (
                <View>
                  <Text style={{padding: 10}}>
                    Traitement de La requète ...
                  </Text>
                  <Spinner color="blue" size={100} />
                </View>
              )}
            </CardItem>
          </Card>
        ) : (
          <Button
            block
            Primary
            style={{margin: 30}}
            onPress={() => {
              setQr(!qr);
              axios
                .post('/api/orders/issueQR/' + order_id)
                .then(response => {
                  setQrImage(response.data.data.qr);
                  setReady(true);
                })
                .catch(error => {
                  console.log(error);
                  setReady(true);
                });
            }}>
            <Text>Recevoir le code Qr</Text>
          </Button>
        )}
        <View>
          {ready ? (
            // <Button
            //   block
            //   success
            //   style={{margin: 30}}
            //   onPress={() => {
            //     navigation.navigate('Confirm', {
            //       order_id: order_id,
            //     });
            //   }}>
            //   <Text>Confirmer La Transaction</Text>
            // </Button>
            <Text>Attente du payement ...</Text>
          ) : null}
        </View>
      </Content>
    </Container>
  );
};

export default Payment;

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
