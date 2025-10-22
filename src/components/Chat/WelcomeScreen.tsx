import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { AutoAwesome as SparkleIcon } from '@mui/icons-material';

interface SuggestionCardProps {
  title: string;
  icon: string;
  onClick: () => void;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ title, onClick }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Card
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        cursor: 'pointer',
        borderRadius: '24px',
        border: '2px solid',
        borderColor: isHovered ? '#3B82F6' : '#E5E7EB',
        bgcolor: '#F9FAFB',
        transition: 'all 0.2s',
        height: '100%',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: isHovered ? '#3B82F6' : 'white',
            border: '1px solid',
            borderColor: isHovered ? '#3B82F6' : '#E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            transition: 'all 0.2s',
          }}
        >
          <SparkleIcon sx={{ color: isHovered ? 'white' : '#93C5FD', fontSize: 24 }} />
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.9375rem',
            lineHeight: 1.6,
            color: '#1F2937',
            fontWeight: 400,
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

interface WelcomeScreenProps {
  userName: string;
  onSuggestionClick: (suggestion: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ userName, onSuggestionClick }) => {
  const suggestions = [
    {
      id: '1',
      title: 'Give me a concise summary of this meeting transcript',
      icon: '✨',
    },
    {
      id: '2',
      title: 'Write a product description for a minimalist smartwatch',
      icon: '✨',
    },
    {
      id: '3',
      title: 'Provide a polite response to a customer asking for a refund',
      icon: '✨',
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        px: 3,
        pt: { xs: 4, md: 8 },
        pb: 20,
        overflow: 'auto',
      }}
    >
      {/* Welcome Message */}
      <Box sx={{ textAlign: 'center', mb: 6, maxWidth: 800 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            fontWeight: 700,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <span style={{ fontSize: '2rem' }}>👋</span> Hi {userName}!
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 600,
            color: '#1F2937',
          }}
        >
          What do you want to learn today?
        </Typography>
      </Box>

      {/* Suggestion Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
          width: '100%',
          maxWidth: 1000,
        }}
      >
        {suggestions.map((suggestion) => (
          <SuggestionCard
            key={suggestion.id}
            title={suggestion.title}
            icon={suggestion.icon}
            onClick={() => onSuggestionClick(suggestion.title)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default WelcomeScreen;
