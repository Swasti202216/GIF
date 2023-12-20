// services/giphy.js
import axios from 'axios';

const API_KEY = 'Zn0jaH8oioEmjjqpow99uk5YbVSru4WE';

const giphy = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
  params: {
    api_key: API_KEY,
  },
});

export default giphy;
