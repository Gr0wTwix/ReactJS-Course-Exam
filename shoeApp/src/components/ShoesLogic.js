import { useState, useEffect, useCallback } from 'react';
import useHttp from '../hooks/useHttp';

const ShoesLogic = () => {
    const [sortBy, setSortBy] = useState('asc');
    const { httpState, sendHttp } = useHttp();

    useEffect(() => {
        sendHttp(`http://localhost:5000/api/shoes?sort=${sortBy}`);
    }, [sortBy]);

    return {
        setSortingAsc: () => setSortBy('asc'),
        setSortingDesc: () => setSortBy('desc'),
        shoes: httpState.data,
        isLoading: httpState.isLoading,
        isInitialLoad: httpState.isInitialLoad
    }
}

export default ShoesLogic;