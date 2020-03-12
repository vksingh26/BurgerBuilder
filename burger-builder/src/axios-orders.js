import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-369b1.firebaseio.com/'
});

export default instance;