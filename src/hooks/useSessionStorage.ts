import { useState, useEffect } from 'react';

const useSessionStorage = (name: string): any => {
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(JSON.parse(sessionStorage.getItem(name)));
    }, [name]);

    return value;
};
// Không sử dụng được
export default useSessionStorage;
