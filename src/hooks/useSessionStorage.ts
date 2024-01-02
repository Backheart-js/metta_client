import { useState, useEffect } from 'react';

const useSessionStorage = (name: string): any => {
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(JSON.parse(sessionStorage.getItem(name)));
    }, []);

    return value;
};

export default useSessionStorage;
