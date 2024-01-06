import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
    const [valueDebounce, setValueDebounce] = useState<T>(value);

    useEffect(() => {
        const handleTimeout = setTimeout(() => setValueDebounce(value), delay);

        return () => {
            clearTimeout(handleTimeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return valueDebounce;
}

export default useDebounce;
