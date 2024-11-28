import React from 'react';
import { MessageSquare, Users, Settings } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

export const ChatSidebar = () => {
  const { chats, activeChat, setActiveChat } = useChatStore();

  return (
    <div className="w-80 border-r border-gray-200 dark:border-gray-700 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold dark:text-white">Messages</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
              activeChat === chat.id ? 'bg-gray-100 dark:bg-gray-800' : ''
            }`}
            onClick={() => setActiveChat(chat.id)}
          >
            <div className="flex items-center space-x-3">
              <img
                src={chat.participants[0].avatar}
                alt={chat.participants[0].name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-semibold dark:text-white">
                  {chat.participants[0].name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {chat.lastMessage?.content || 'No messages yet'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-around">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <MessageSquare className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <Users className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};