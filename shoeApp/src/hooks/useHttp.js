import { useReducer} from "react";

const httpReducer = (state, action) => {
    if (action.type === 'PENDING') {
        return {
            data: null,
            isLoading: true,
            isInitialLoad: false
        }
    }
    if (action.type === 'SUCCESS') {
        return {
            data: action.payload,
            isLoading: false
        }
    }
    return state;
}

const initialState = {
    data: null,
    isLoading: false,
    isInitialLoad: true
}

const useHttp = () => {
    const [httpState, dispatch] = useReducer(httpReducer, initialState);

    async function sendHttp(url, options) {
        dispatch({ type: 'PENDING' });
        try {
            const res = await fetch(url, options);
            const data = await res.text();

            dispatch({ type: 'SUCCESS', payload: data });
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    return {
        httpState,
        sendHttp
    }
}

export default useHttp;