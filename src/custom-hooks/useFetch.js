import { useEffect, useState } from 'react';

export function useFetch(url, opts) {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(url, opts)
            .then((res) => res.json())
            .then((data) => {
                setResponse(data);
                setLoading(false);
            })
            .catch(() => {
                setHasError(true);
                setLoading(false);
            });
    }, [url, opts]);
    return [response, loading, hasError];
}
