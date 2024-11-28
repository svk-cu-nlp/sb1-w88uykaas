import axios from 'axios';
import { io } from 'socket.io-client';

const API_URL = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Socket.IO connection
export const socket = io('http://localhost:3000', {
  autoConnect: false,
  auth: {
    token: localStorage.getItem('token'),
  },
});

// Auth API
export const auth = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
};

// Messages API
export const messages = {
  send: (data: { chatId: string; content: string; type?: string; replyTo?: string }) =>
    api.post('/messages', data),
  get: (chatId: string) => api.get(`/messages/${chatId}`),
};