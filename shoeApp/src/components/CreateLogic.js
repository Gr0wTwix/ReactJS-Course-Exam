import useForm from "../hooks/useForm";

import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/useHttp";

const initialCreateState = {
    title: {
        value: '',
        isValid: true
    },
    description: {
        value: '',
        isValid: true
    },
    price: {
        value: 0,
        isValid: true
    },
    image: {
        value: '',
        isValid: true
    }
}

const CreateLogic = () => {
    const [createState, createInputChangeHandler] = useForm(initialCreateState);
    const { accessToken } = useSelector(state => state);
    const { httpState, sendHttp } = useHttp();

    const navigate = useNavigate();

    const onCreateSubmitHandler = event => {
        event.preventDefault();
        const url = 'http://localhost:5000/api/shoes';

        const sendHttpOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': accessToken
            },
            body: JSON.stringify({
                title: createState.title.value,
                image: createState.image.value,
                description: createState.description.value,
                price: createState.price.value
            }),
            credentials: 'include'
        };

        fetch(url, sendHttpOptions)
            .then(response => console.log('Submitted successfully!'))
            .catch(error => console.log('Form submit error!', error))
            .then(() => navigate('/'));
    }

    return {
        createState,
        createInputChangeHandler,
        onCreateSubmitHandler,
        isLoading: httpState.isLoading
    }
}

export default CreateLogic;