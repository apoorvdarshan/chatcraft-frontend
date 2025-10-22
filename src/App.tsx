import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import WelcomeScreen from './components/Chat/WelcomeScreen';
import ChatConversation from './components/Chat/ChatConversation';
import MessageInput from './components/Chat/MessageInput';
import { useChatStore } from './store/chatStore';

const App: React.FC = () => {
  const { currentChatId, createNewChat, addMessage, getCurrentChat } = useChatStore();
  const currentChat = getCurrentChat();
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  const handleNewChat = () => {
    createNewChat();
  };

  const handleSendMessage = (message: string) => {
    let chatId = currentChatId;

    // Create new chat if none exists
    if (!chatId) {
      chatId = createNewChat();
    }

    // Add user message
    addMessage(chatId, message, 'user');
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.types.includes('Files')) {
      setIsDraggingFile(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set to false if leaving the main content area
    if (e.currentTarget === e.target) {
      setIsDraggingFile(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        {/* Sidebar */}
        <Sidebar onNewChat={handleNewChat} />

        {/* Main Content */}
        <Box
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            bgcolor: '#FFFFFF',
            position: 'relative',
          }}
        >
          {/* Header */}
          <Header onNewChat={handleNewChat} />

          {/* Chat Area */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {currentChat && currentChat.messages.length > 0 ? (
              <ChatConversation messages={currentChat.messages} />
            ) : (
              <WelcomeScreen userName="Laurence" onSuggestionClick={handleSuggestionClick} />
            )}
          </Box>

          {/* Message Input */}
          <MessageInput onSendMessage={handleSendMessage} isDragging={isDraggingFile} setIsDragging={setIsDraggingFile} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
