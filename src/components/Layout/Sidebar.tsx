import React from 'react';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Sms as SmsIcon,
  Folder as FolderIcon,
  WatchLater as WatchLaterIcon,
  Public as PublicIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
  UnfoldMore as UnfoldMoreIcon,
  RocketLaunch as RocketLaunchIcon,
} from '@mui/icons-material';
import { useChatStore } from '../../store/chatStore';
import logo from '../../assets/logo.png';
import lawrenceCruzImage from '../../assets/lawrence cruz.png';

const SIDEBAR_WIDTH = 280;
const COLLAPSED_SIDEBAR_WIDTH = 88;

interface SidebarProps {
  onNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { chats, currentChatId, setCurrentChat, sidebarOpen, setSidebarOpen } = useChatStore();
  const [searchQuery, setSearchQuery] = React.useState('');

  const menuItems = [
    { icon: <SmsIcon />, label: 'Home', shortcut: '⌘ H' },
    { icon: <FolderIcon />, label: 'Library', shortcut: '⌘ T' },
    { icon: <WatchLaterIcon />, label: 'History', shortcut: '⌘ G' },
    { icon: <PublicIcon />, label: 'Explore', shortcut: '⌘ L' },
  ];

  // Filter chats based on search query
  const filteredChats = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return chats;
    }
    return chats.filter((chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [chats, searchQuery]);

  const sidebarContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#F9FAFB',
        borderRight: '1px solid #E5E7EB',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          component="img"
          src={logo}
          alt="Inteliq Logo"
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            objectFit: 'contain',
          }}
        />
        {sidebarOpen && (
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.125rem' }}>
            Inteliq
          </Typography>
        )}
        {!isMobile && (
          <IconButton
            size="small"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            sx={{
              ml: 'auto',
              bgcolor: '#EEF2FF',
              borderRadius: '8px',
              '&:hover': {
                bgcolor: '#E0E7FF',
              },
            }}
          >
            <ChevronRightIcon
              sx={{
                transform: sidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
                color: '#4F46E5',
                fontSize: '1.25rem',
              }}
            />
          </IconButton>
        )}
      </Box>

      {/* Search */}
      {sidebarOpen && (
        <Box sx={{ px: 2, pb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search for chats..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: '#9CA3AF', fontSize: 18 }} />,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
                bgcolor: 'white',
                fontSize: '0.875rem',
                paddingLeft: '8px',
                '& fieldset': {
                  borderColor: '#E5E7EB',
                  borderWidth: '1px',
                },
                '&:hover fieldset': {
                  borderColor: '#D1D5DB',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4F46E5',
                  borderWidth: '1px',
                },
              },
              '& .MuiOutlinedInput-input': {
                padding: '8px 12px 8px 4px',
                color: '#1F2937',
                '&::placeholder': {
                  color: '#9CA3AF',
                  opacity: 1,
                },
              },
            }}
          />
        </Box>
      )}

      {/* Menu Items */}
      <List sx={{ px: 1 }}>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={index === 0}
              sx={{
                borderRadius: '12px',
                py: 1.5,
                px: sidebarOpen ? 1.5 : 0,
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                },
                '&.Mui-selected': {
                  bgcolor: 'white',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                  '&:hover': {
                    bgcolor: 'white',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                  },
                },
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: sidebarOpen ? 2 : 0,
                  justifyContent: 'center',
                  color: index === 0 ? '#4F46E5' : '#6B7280',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {sidebarOpen && (
                <>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: index === 0 ? 500 : 400,
                      color: '#1F2937',
                    }}
                  />
                  <Box
                    sx={{
                      bgcolor: '#F3F4F6',
                      color: '#6B7280',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      px: 0.75,
                      py: 0.25,
                      borderRadius: '4px',
                      lineHeight: 1.5,
                    }}
                  >
                    {item.shortcut}
                  </Box>
                </>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Recent Chats */}
      {sidebarOpen && (
        <Box sx={{ flex: 1, overflow: 'auto', px: 2, mt: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, fontSize: '0.8rem', mb: 1.5, color: '#1F2937' }}
          >
            Recent Chats
          </Typography>
          <List sx={{ p: 0 }}>
            {filteredChats.slice(0, searchQuery.trim() ? filteredChats.length : 8).map((chat) => (
              <ListItemButton
                key={chat.id}
                onClick={() => setCurrentChat(chat.id)}
                selected={chat.id === currentChatId}
                sx={{
                  borderRadius: '8px',
                  mb: 0.5,
                  py: 0.75,
                  px: 1,
                  minHeight: 'auto',
                  '&:hover': {
                    bgcolor: '#F3F4F6',
                  },
                  '&.Mui-selected': {
                    bgcolor: 'white',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                    '&:hover': {
                      bgcolor: 'white',
                    },
                  },
                }}
              >
                <ListItemText
                  primary={chat.title}
                  primaryTypographyProps={{
                    fontSize: '0.813rem',
                    fontWeight: 400,
                    color: '#4B5563',
                    noWrap: true,
                    lineHeight: 1.5,
                  }}
                />
              </ListItemButton>
            ))}
            {filteredChats.length === 0 && (
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.813rem',
                  color: '#9CA3AF',
                  textAlign: 'center',
                  py: 2,
                }}
              >
                No chats found
              </Typography>
            )}
          </List>
          {!searchQuery.trim() && chats.length > 8 && (
            <Typography
              variant="caption"
              sx={{
                color: '#4F46E5',
                cursor: 'pointer',
                display: 'block',
                mt: 1.5,
                fontSize: '0.813rem',
                fontWeight: 500,
              }}
            >
              View All →
            </Typography>
          )}
        </Box>
      )}

      {/* Spacer for collapsed sidebar */}
      {!sidebarOpen && <Box sx={{ flex: 1 }} />}

      {/* Try Pro */}
      <Box
        sx={{
          mx: 2,
          mb: 1.5,
          p: sidebarOpen ? 2 : 2,
          height: sidebarOpen ? 72 : 'auto',
          background: sidebarOpen ? 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 50%, #DDD6FE 100%)' : 'white',
          borderRadius: sidebarOpen ? '16px' : '24px',
          border: sidebarOpen ? 'none' : '1px solid #E5E7EB',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 'none',
        }}
      >
        {sidebarOpen ? (
          <>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '1rem', mb: 0.5, color: '#1F2937', alignSelf: 'flex-start' }}>
              Try Pro!
            </Typography>
            <Typography variant="caption" sx={{ color: '#6B7280', fontSize: '0.813rem', alignSelf: 'flex-start' }}>
              Upgrade for smarter AI and more...
            </Typography>
            <Box
              sx={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-65%)',
              }}
            >
              <RocketLaunchIcon
                sx={{
                  fontSize: '1.75rem',
                  color: '#818CF8',
                  opacity: 0.9,
                }}
              />
            </Box>
          </>
        ) : (
          <Typography
            variant="h6"
            sx={{
              fontSize: '0.813rem',
              fontWeight: 600,
              color: '#4B5563',
              textAlign: 'center',
              lineHeight: 1.3,
            }}
          >
            Try Pro!
          </Typography>
        )}
      </Box>

      {/* User Profile */}
      <Box
        sx={{
          mx: 2,
          mb: 2,
          p: sidebarOpen ? 2 : 0,
          height: sidebarOpen ? 72 : 'auto',
          bgcolor: sidebarOpen ? 'white' : 'transparent',
          borderRadius: '16px',
          border: sidebarOpen ? '1px solid #E5E7EB' : 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          justifyContent: sidebarOpen ? 'space-between' : 'center',
        }}
      >
        {sidebarOpen ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                component="img"
                src={lawrenceCruzImage}
                alt="Lawrence Cruz"
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
              <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                Lawrence Cruz
              </Typography>
            </Box>
            <IconButton size="small">
              <UnfoldMoreIcon fontSize="small" />
            </IconButton>
          </>
        ) : (
          <Box
            component="img"
            src={lawrenceCruzImage}
            alt="Lawrence Cruz"
            sx={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        )}
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarOpen ? SIDEBAR_WIDTH : COLLAPSED_SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarOpen ? SIDEBAR_WIDTH : COLLAPSED_SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  );
};

export default Sidebar;
