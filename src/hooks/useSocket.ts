import { useEffect } from 'react';
import { socket } from '../services/api';
import { useChatStore } from '../store/chatStore';

export const useSocket = () => {
  const { currentUser, addMessage } = useChatStore();

  useEffect(() => {
    if (!currentUser) return;

    socket.auth = { token: localStorage.getItem('token') };
    socket.connect();

    socket.on('new_message', (message) => {
      addMessage(message.chatId, message);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser, addMessage]);

  return socket;
};