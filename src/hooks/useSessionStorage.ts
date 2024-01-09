import { useState, useEffect } from 'react';

const useSessionStorage = (name: string): any => {
    const [value, setValue] = useState('');

    useEffect(() => {
        const storedValue = sessionStorage.getItem(name);
        if (storedValue !== null) {
            setValue(JSON.parse(storedValue));
        }
    }, [name]);

    return value;
};

export default useSessionStorage;
