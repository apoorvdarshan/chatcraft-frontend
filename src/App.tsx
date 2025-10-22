import React from 'react';
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        {/* Sidebar */}
        <Sidebar onNewChat={handleNewChat} />

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            bgcolor: '#FFFFFF',
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
          <MessageInput onSendMessage={handleSendMessage} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
