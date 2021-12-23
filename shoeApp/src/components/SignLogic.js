import { useState } from 'react';
import useForm from '../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';

import authSlice from '../store/auth-slice';
import { checkIsInvalid } from '../utils/checkIsInvalid';
import useHttp from '../hooks/useHttp';

const initialAuthState = {
    email: {
        value: '',
        isValid: true,
    },
    username: {
        value: '',
        isValid: true,
    },
    password: {
        value: '',
        isValid: true,
    }
}

const validateAuthObject = {
    email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    username: /^[a-zA-Z0-9]{5,20}$/,
    password: /^[a-zA-Z0-9]{6,15}$/
}


const SignLogic = () => {
    const [isLoginMode, setIsLoginMode] = useState(false);
    const [authFormData, onAuthInputChangeHandler, clearInputs] = useForm(initialAuthState, validateAuthObject);

    const { sendHttp: sendHttp} = useHttp();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleAuthSubmitHandler(e) {
        e.preventDefault();

        const isSomeFieldInvalid = checkIsInvalid(authFormData);
        if (isSomeFieldInvalid) return;

        if (isLoginMode) {
            await sendHttp('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: authFormData.email.value,
                    password: authFormData.password.value
                })
            }).then((data) => {
                console.log(data);
                dispatch(authSlice.actions.login({ accessToken: data.token, userId: data.userId }));
                navigate('/');
            });
        } else {
            await sendHttp('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: authFormData.email.value,
                    password: authFormData.password.value,
                    username: authFormData.username.value
                })
            }).then(() => {
                clearInputs();
                setIsLoginMode(true);
            })
        }
    }

    return {
        isLoginMode,
        authFormData,
        onAuthInputChangeHandler,
        handleAuthSubmitHandler,
        onRegisterMode: () => setIsLoginMode(false),
        onLoginMode: () => setIsLoginMode(true),
    }
}

export default SignLogic;