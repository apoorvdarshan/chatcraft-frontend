import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { AutoAwesome as SparkleIcon } from '@mui/icons-material';

interface SuggestionCardProps {
  title: string;
  icon: string;
  onClick: () => void;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ title, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        transition: 'all 0.2s',
        height: '100%',
        '&:hover': {
          borderColor: '#4F46E5',
          boxShadow: '0 4px 12px rgba(79, 70, 229, 0.15)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '8px',
            bgcolor: '#EEF2FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <SparkleIcon sx={{ color: '#4F46E5', fontSize: 20 }} />
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.875rem',
            lineHeight: 1.5,
            color: '#1F2937',
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
        justifyContent: 'center',
        height: '100%',
        px: 3,
        pb: 20,
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
