import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { signInSuccess, SignFailure } from './actions';

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;

        const response = yield call(api.post, 'sessions', {
            email,
            password,
        });

        const { token, user } = response.data;

        if (user.provider) {
            Alert.alert(
                'Error to authenticate. User cannot be a services provider.',
            );
            return;
        }

        api.defaults.headers.Authorization = `Bearer ${token}`;

        yield put(signInSuccess(token, user));

        // history.push('/dashboard');
    } catch (err) {
        Alert.alert('Error to authenticate. Verify your data.');
        yield put(SignFailure());
    }
}

export function* signUp({ payload }) {
    try {
        const { name, email, password } = payload;

        yield call(api.post, 'users', {
            name,
            email,
            password,
        });

        // history.push('/');
    } catch (err) {
        Alert.alert('Fail to sign up. Verify your data.');
        yield put(SignFailure());
    }
}

export function setToken({ payload }) {
    if (!payload) return;

    const { token } = payload.auth;

    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
