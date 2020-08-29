import React, {useContext, useState} from 'react';
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
  Icon,
  Form,
  Item,
  Input,
} from 'native-base';
import {AuthContext} from './AuthProvider';

const LoginScreen = ({navigation}) => {
  const {login, error} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Connexion <Icon name="user" type="Feather" style={{color: 'white'}} />{' '}
        </Text>
      </View>
      <Content>
        {error ? (
          <Text
            style={{
              color: 'red',
              textAlign: 'center',
              marginTop: 30,
              fontSize: 18,
            }}>
            {' '}
            {error}{' '}
          </Text>
        ) : null}
        <Form style={styles.formTag}>
          <Item style={styles.inputStyle}>
            <Icon active name="mail" style={{color: '#1C6587'}} />
            <Input
              placeholder="E-mail"
              onChangeText={text => {
                setEmail(text);
              }}
              value={email}
            />
          </Item>
          <Item style={styles.inputStyle}>
            <Icon active name="key" style={{color: '#1C6587'}} />
            <Input
              placeholder="Mot de passe"
              onChangeText={text => {
                setPassword(text);
              }}
              value={password}
              secureTextEntry={true}
            />
          </Item>
        </Form>

        <Button
          block
          Primary
          style={{margin: 40, backgroundColor: '#1C6587', borderRadius: 8}}
          onPress={() => login(email, password)}>
          <Text style={{fontWeight: 'bold'}}> Connexion </Text>
        </Button>
      </Content>
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  testHighlight: {
    backgroundColor: 'red',
  },
  horizentalCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 0.5,
  },
  titre: {
    fontSize: 22,
    color: 'white',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  formTag: {
    width: 400,
    marginTop: 10,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: '#1C6587',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    padding: 20,
    marginBottom: 25,
  },

  headerText: {
    fontSize: 32,
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
});
