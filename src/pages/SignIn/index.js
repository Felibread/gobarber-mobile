import React, { useRef } from 'react';
import { Image } from 'react-native';

import PropTypes from 'prop-types';

import logo from '~/assets/logo.png';

import Background from '~/components/Background';

import {
    Container,
    Form,
    FormInput,
    SubmitButton,
    SignLink,
    SignLinkText,
} from './styles';

export default function SignIn({ navigation }) {
    const passwordRef = useRef();

    function handleSubmit() {}

    return (
        <Background>
            <Container>
                <Image source={logo} />

                <Form>
                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Your email"
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Your password"
                        ref={passwordRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                    />

                    <SubmitButton onPress={handleSubmit}>Log in</SubmitButton>
                </Form>

                <SignLink
                    onPress={() => {
                        navigation.navigate('SignUp');
                    }}
                >
                    <SignLinkText>Create free account</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}

SignIn.propTypes = {
    navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

SignIn.defaultProps = {
    navigation: null,
};
