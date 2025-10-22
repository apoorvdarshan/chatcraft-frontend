import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import ChatMessage from './ChatMessage';
import { Message } from '../../types';

interface ChatConversationProps {
  messages: Message[];
}

const ChatConversation: React.FC<ChatConversationProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        px: { xs: 2, md: 4 },
        py: 4,
      }}
    >
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </Box>
    </Box>
  );
};

export default ChatConversation;
