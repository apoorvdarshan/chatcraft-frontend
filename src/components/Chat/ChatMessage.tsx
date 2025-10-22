import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { Message } from '../../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 4,
        alignItems: 'flex-start',
      }}
    >
      {/* Avatar */}
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: isUser ? '#10B981' : '#EEF2FF',
          color: isUser ? 'white' : '#4F46E5',
          fontSize: '0.875rem',
          fontWeight: 600,
        }}
      >
        {isUser ? 'LC' : '🤖'}
      </Avatar>

      {/* Message Content */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            mb: 0.5,
            color: '#1F2937',
          }}
        >
          {isUser ? 'You' : 'ChatGPT 4'}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '0.875rem',
            lineHeight: 1.6,
            color: '#374151',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {message.content}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatMessage;
