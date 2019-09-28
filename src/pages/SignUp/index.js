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

export default function SignUp({ navigation }) {
    const emailRef = useRef();
    const passwordRef = useRef();

    function handleSubmit() {}

    return (
        <Background>
            <Container>
                <Image source={logo} />

                <Form>
                    <FormInput
                        icon="person-outline"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Your full name"
                        returnKeyType="next"
                        onSubmitEditing={() => emailRef.current.focus()}
                    />

                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Your email"
                        ref={emailRef}
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
                        navigation.navigate('SignIn');
                    }}
                >
                    <SignLinkText>
                        Already have an account? Sign in!
                    </SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}

SignUp.propTypes = {
    navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

SignUp.defaultProps = {
    navigation: null,
};
