import React, { useState, useRef } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  Collapse,
} from '@mui/material';
import {
  AttachFile as AttachFileIcon,
  PhotoCamera as PhotoCameraIcon,
  Send as SendIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useChatStore } from '../../store/chatStore';
import { AttachedFile } from '../../types';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isDragging?: boolean;
  setIsDragging?: (isDragging: boolean) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isDragging = false, setIsDragging }) => {
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
      processFiles(files);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const processFiles = (files: FileList | File[]) => {
    Array.from(files).forEach((file) => {
      const newFile: AttachedFile = {
        id: Math.random().toString(36).substring(2, 11),
        name: file.name,
        progress: Math.random() * 100,
      };
      addAttachedFile(newFile);
    });
    setShowAttachments(true);
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging?.(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  };

  // Handle paste from clipboard
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    const files: File[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file) {
          files.push(file);
        }
      }
    }

    if (files.length > 0) {
      e.preventDefault();
      processFiles(files);
    }
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
              p: 3,
              border: '1px solid #E5E7EB',
              borderRadius: '16px',
              bgcolor: 'white',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2.5,
                pb: 2,
                borderBottom: '1px solid #F3F4F6',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.125rem', color: '#1F2937' }}>
                Attached Files
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <IconButton
                  size="small"
                  onClick={() => {
                    clearAttachedFiles();
                    setShowAttachments(false);
                  }}
                  sx={{
                    color: '#93C5FD',
                    bgcolor: '#EFF6FF',
                    padding: '8px',
                    '&:hover': { bgcolor: '#DBEAFE' },
                  }}
                >
                  <DeleteIcon sx={{ fontSize: 20 }} />
                </IconButton>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                    color: '#3B82F6',
                    fontSize: '0.938rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    '&:hover': { color: '#2563EB' },
                  }}
                  onClick={handleAttachClick}
                >
                  Add
                  <AddIcon sx={{ fontSize: 20 }} />
                </Box>
              </Box>
            </Box>

            {attachedFiles.map((file) => (
              <Box
                key={file.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 1.5,
                  py: 1,
                }}
              >
                <AttachFileIcon sx={{ color: '#9CA3AF', fontSize: 24, transform: 'rotate(-45deg)' }} />
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '1rem',
                      mb: file.progress !== undefined && file.progress < 100 ? 0.5 : 0,
                      color: file.progress !== undefined && file.progress < 100 ? '#9CA3AF' : '#1F2937',
                      fontWeight: 400,
                    }}
                  >
                    {file.name}
                  </Typography>
                  {file.progress !== undefined && file.progress < 100 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="caption" sx={{ color: '#93C5FD', fontSize: '0.875rem', minWidth: '40px' }}>
                        {Math.round(file.progress)}%
                      </Typography>
                    </Box>
                  )}
                </Box>
                <IconButton
                  size="small"
                  onClick={() => removeAttachedFile(file.id)}
                  sx={{
                    color: '#D1D5DB',
                    padding: '4px',
                    '&:hover': {
                      color: '#9CA3AF',
                      bgcolor: 'transparent',
                    },
                  }}
                >
                  <CloseIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Box>
            ))}
          </Paper>
        </Collapse>

        {/* Message Input */}
        <Box
          onDrop={handleDrop}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            px: 2.5,
            py: 1.5,
            border: '2px solid',
            borderColor: isDragging ? '#4F46E5' : '#E5E7EB',
            borderRadius: '16px',
            bgcolor: isDragging ? '#F5F3FF' : 'white',
            transition: 'all 0.2s',
            '&:focus-within': {
              borderColor: '#4F46E5',
              boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)',
            },
          }}
        >
          {/* Attach Buttons */}
          <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
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
                padding: '6px',
                '&:hover': { bgcolor: '#F3F4F6' },
              }}
            >
              <AttachFileIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleAttachClick}
              sx={{
                color: '#6B7280',
                padding: '6px',
                '&:hover': { bgcolor: '#F3F4F6' },
              }}
            >
              <PhotoCameraIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          {/* Text Input */}
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            onPaste={handlePaste}
            placeholder="Ask me a question..."
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            sx={{
              '& .MuiInputBase-root': {
                padding: 0,
              },
              '& .MuiInputBase-input': {
                fontSize: '0.9375rem',
                padding: 0,
                color: '#1F2937',
                '&::placeholder': {
                  color: '#9CA3AF',
                  opacity: 1,
                },
              },
            }}
          />

          {/* Character Count */}
          <Typography
            variant="caption"
            sx={{
              color: '#9CA3AF',
              fontSize: '0.8125rem',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {message.length}/1000
          </Typography>

          {/* Send Button */}
          <IconButton
            onClick={handleSend}
            disabled={!message.trim()}
            sx={{
              bgcolor: message.trim() ? '#C7D2FE' : '#E5E7EB',
              color: message.trim() ? '#6366F1' : '#9CA3AF',
              borderRadius: '8px',
              padding: '8px',
              flexShrink: 0,
              '&:hover': {
                bgcolor: message.trim() ? '#A5B4FC' : '#E5E7EB',
              },
              '&.Mui-disabled': {
                bgcolor: '#E5E7EB',
                color: '#9CA3AF',
              },
            }}
          >
            <SendIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageInput;
