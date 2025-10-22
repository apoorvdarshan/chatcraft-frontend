import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Share as ShareIcon,
  HelpOutline as HelpIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useChatStore } from '../../store/chatStore';

interface HeaderProps {
  onNewChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewChat }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { toggleSidebar } = useChatStore();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: 'white',
        borderBottom: '1px solid #E5E7EB',
        color: '#1F2937',
      }}
    >
      <Toolbar sx={{ gap: 2, justifyContent: 'space-between' }}>
        {/* Left Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isMobile && (
            <IconButton onClick={toggleSidebar} edge="start" sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Model Selector */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1.5,
              py: 0.5,
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              bgcolor: 'white',
            }}
          >
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                bgcolor: '#F3F4F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#6B7280">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
            </Box>
            <Select
              value="chatgpt4"
              variant="standard"
              disableUnderline
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                '& .MuiSelect-select': {
                  py: 0,
                  pr: 3,
                },
              }}
            >
              <MenuItem value="chatgpt4">ChatGPT 4</MenuItem>
              <MenuItem value="chatgpt3">ChatGPT 3.5</MenuItem>
              <MenuItem value="claude">Claude</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size="small" sx={{ color: '#6B7280' }}>
            <ShareIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: '#6B7280' }}>
            <HelpIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={onNewChat}
            sx={{
              bgcolor: '#4F46E5',
              color: 'white',
              borderRadius: '8px',
              px: 2,
              '&:hover': {
                bgcolor: '#4338CA',
              },
            }}
          >
            <AddIcon fontSize="small" sx={{ mr: 0.5 }} />
            {!isMobile && (
              <Typography variant="button" sx={{ fontSize: '0.875rem' }}>
                New Chat
              </Typography>
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
