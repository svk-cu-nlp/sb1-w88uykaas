import React from 'react';
import { ChatSidebar } from './components/ChatSidebar';
import { ChatWindow } from './components/ChatWindow';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto h-screen p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full flex overflow-hidden">
          <ChatSidebar />
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}

export default App;