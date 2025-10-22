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
  Help as HelpIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useChatStore, ModelType } from '../../store/chatStore';
import chatGPTLogo from '../../assets/ChatGPT-Logo.png';
import claudeLogo from '../../assets/claude-logo.png';

interface HeaderProps {
  onNewChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewChat }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { toggleSidebar, selectedModel, setSelectedModel } = useChatStore();

  const modelConfig = {
    chatgpt4: { name: 'ChatGPT 4', logo: chatGPTLogo },
    chatgpt3: { name: 'ChatGPT 3.5', logo: chatGPTLogo },
    claude: { name: 'Claude', logo: claudeLogo },
  };

  const handleModelChange = (event: any) => {
    const newModel = event.target.value as ModelType;
    setSelectedModel(newModel);
    console.log('Model switched to:', modelConfig[newModel].name);
  };

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
              component="img"
              src={modelConfig[selectedModel].logo}
              alt={modelConfig[selectedModel].name}
              sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <Select
              value={selectedModel}
              onChange={handleModelChange}
              variant="standard"
              disableUnderline
              renderValue={(value) => modelConfig[value as ModelType].name}
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                '& .MuiSelect-select': {
                  py: 0,
                  pr: 3,
                },
              }}
            >
              <MenuItem value="chatgpt4">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    component="img"
                    src={chatGPTLogo}
                    alt="ChatGPT 4"
                    sx={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span>ChatGPT 4</span>
                </Box>
              </MenuItem>
              <MenuItem value="chatgpt3">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    component="img"
                    src={chatGPTLogo}
                    alt="ChatGPT 3.5"
                    sx={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span>ChatGPT 3.5</span>
                </Box>
              </MenuItem>
              <MenuItem value="claude">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    component="img"
                    src={claudeLogo}
                    alt="Claude"
                    sx={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span>Claude</span>
                </Box>
              </MenuItem>
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
              bgcolor: '#3B82F6',
              color: 'white',
              borderRadius: '24px',
              px: 2.5,
              py: 1,
              '&:hover': {
                bgcolor: '#2563EB',
              },
            }}
          >
            <AddIcon fontSize="small" sx={{ mr: 0.5 }} />
            {!isMobile && (
              <Typography variant="button" sx={{ fontSize: '0.875rem', textTransform: 'none', fontWeight: 500 }}>
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
