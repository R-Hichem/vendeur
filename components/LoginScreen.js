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
      <Header>
        <Body style={styles.horizentalCenter}>
          <Text style={styles.titre}>Connexion</Text>
          <Icon name="user" type="Feather" style={{color: 'white'}} />
        </Body>
      </Header>
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
          <Item>
            <Input
              placeholder="E-mail"
              onChangeText={text => {
                setEmail(text);
              }}
              value={email}
            />
          </Item>
          <Item last>
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
          style={{margin: 30}}
          onPress={() => login(email, password)}>
          <Text>Se Connecter ? </Text>
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
    margin: 40,
  },
});
