import React, { useState, useEffect } from 'react'
import axios from 'axios';

function DataFetchingOne() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [post, setPost] = useState({});

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts/1")
        .then((response) => {
            debugger;
            setLoading(false);
            setPost(response.data);
            setError('');
        })
        .catch((error) => {
            setLoading(false);
            setError(error);
            setPost({});
        })
    }, []);
    return (
        <div>
            {loading ? 'Loading...' : post.body}
            {error ? error: null}
        </div>
    )
}

export default DataFetchingOne
