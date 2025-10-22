import React, { useState, useRef } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Typography,
  LinearProgress,
  Paper,
  Collapse,
} from '@mui/material';
import {
  AttachFile as AttachFileIcon,
  Image as ImageIcon,
  Send as SendIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useChatStore } from '../../store/chatStore';
import { AttachedFile } from '../../types';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [showAttachments, setShowAttachments] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { attachedFiles, addAttachedFile, removeAttachedFile, clearAttachedFiles } = useChatStore();

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      clearAttachedFiles();
      setShowAttachments(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const newFile: AttachedFile = {
          id: Math.random().toString(36).substring(2, 11),
          name: file.name,
          progress: Math.random() * 100,
        };
        addAttachedFile(newFile);
      });
      setShowAttachments(true);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box
      sx={{
        borderTop: '1px solid #E5E7EB',
        bgcolor: 'white',
        px: { xs: 2, md: 4 },
        py: 2,
      }}
    >
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        {/* Attachments Panel */}
        <Collapse in={showAttachments && attachedFiles.length > 0}>
          <Paper
            elevation={0}
            sx={{
              mb: 2,
              p: 2,
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              bgcolor: '#F9FAFB',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 1.5,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                Attached Files
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={handleAttachClick}
                  sx={{
                    color: '#4F46E5',
                    '&:hover': { bgcolor: '#EEF2FF' },
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => {
                    clearAttachedFiles();
                    setShowAttachments(false);
                  }}
                  sx={{
                    color: '#6B7280',
                    '&:hover': { bgcolor: '#F3F4F6' },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {attachedFiles.map((file) => (
              <Box
                key={file.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  mb: 1,
                  p: 1.5,
                  bgcolor: 'white',
                  borderRadius: '8px',
                }}
              >
                <AttachFileIcon sx={{ color: '#6B7280', fontSize: 20 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                    {file.name}
                  </Typography>
                  {file.progress !== undefined && file.progress < 100 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={file.progress}
                        sx={{ flex: 1, height: 4, borderRadius: 2 }}
                      />
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: '0.75rem' }}>
                        {Math.round(file.progress)}%
                      </Typography>
                    </Box>
                  )}
                </Box>
                <IconButton
                  size="small"
                  onClick={() => removeAttachedFile(file.id)}
                  sx={{ color: '#6B7280' }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Paper>
        </Collapse>

        {/* Message Input */}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'flex-end',
            p: 1.5,
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            bgcolor: 'white',
            '&:focus-within': {
              borderColor: '#4F46E5',
              boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)',
            },
          }}
        >
          {/* Attach Buttons */}
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              multiple
            />
            <IconButton
              size="small"
              onClick={handleAttachClick}
              sx={{
                color: '#6B7280',
                '&:hover': { bgcolor: '#F3F4F6' },
              }}
            >
              <AttachFileIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleAttachClick}
              sx={{
                color: '#6B7280',
                '&:hover': { bgcolor: '#F3F4F6' },
              }}
            >
              <ImageIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Text Input */}
          <TextField
            fullWidth
            multiline
            maxRows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me a question..."
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '0.875rem',
                py: 0.5,
              },
            }}
          />

          {/* Character Count */}
          <Typography
            variant="caption"
            sx={{
              color: '#9CA3AF',
              fontSize: '0.75rem',
              whiteSpace: 'nowrap',
            }}
          >
            {message.length}/1000
          </Typography>

          {/* Send Button */}
          <IconButton
            onClick={handleSend}
            disabled={!message.trim()}
            sx={{
              bgcolor: message.trim() ? '#4F46E5' : '#E5E7EB',
              color: 'white',
              borderRadius: '8px',
              '&:hover': {
                bgcolor: message.trim() ? '#4338CA' : '#E5E7EB',
              },
              '&.Mui-disabled': {
                bgcolor: '#E5E7EB',
                color: '#9CA3AF',
              },
            }}
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageInput;
