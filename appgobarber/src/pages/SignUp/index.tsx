import React, { useRef, useCallback } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImg from '../../assets/logo.png';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

interface SignUpFormData {
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    formRef.current?.setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('E-mail inválido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false, // retorna todos os erros de uma vez
      });

      await api.post('users', data);

      Alert.alert(
        'Cadastro realizado!',
        'Você já pode fazer seu logon no GoBarber!',
      );

      navigation.goBack();

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        console.log(errors);

        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert(
        'Erro no cadastro',
        'Ocorreu um erro ao fazer o cadastro, tente novamente.',
      );
    }
  }, [navigation]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form
              ref={formRef}
              onSubmit={handleSignUp}
              style={{ width: '100%' }}
            >
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCapitalize="words"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                ref={emailInputRef}
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                returnKeyType="send"
                textContentType="newPassword"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
                name="password"
                icon="lock"
                placeholder="Senha"
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>voltar para logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
