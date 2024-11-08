
// src/services/refreshApi.ts
import axios from 'axios';
import API_URL from '../utils/data';

const refreshApi = axios.create({
  baseURL: API_URL,
});

export default refreshApi;