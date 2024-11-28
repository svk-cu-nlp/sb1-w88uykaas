import React, { useState } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { format } from 'date-fns';

export const ChatWindow = () => {
  const [message, setMessage] = useState('');
  const { activeChat, chats, currentUser, sendMessage } = useChatStore();
  const chat = chats.find((c) => c.id === activeChat);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && activeChat) {
      sendMessage(activeChat, message);
      setMessage('');
    }
  };

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <img
            src={chat.participants[0].avatar}
            alt={chat.participants[0].name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-semibold dark:text-white">{chat.participants[0].name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {chat.participants[0].status === 'online' ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.map((msg) => {
          const isOwn = msg.senderId === currentUser?.id;
          return (
            <div
              key={msg.id}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  isOwn
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 dark:text-white'
                }`}
              >
                <p>{msg.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {format(msg.timestamp, 'HH:mm')}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <Paperclip className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <button
            type="button"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <Smile className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
          <button
            type="submit"
            className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};