# ChatCraft Frontend

A modern chat application interface inspired by ChatGPT, built with React, TypeScript, and Material-UI.

## Features

- 🎨 Clean and modern UI matching the Figma designs
- 💬 Real-time chat interface with message history
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎯 Collapsible sidebar with chat history
- 📎 File attachment UI with progress indicators
- ⚡ Fast and smooth animations
- 🎭 Frontend-only implementation with simulated AI responses

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI) v5
- **State Management**: Zustand
- **Build Tool**: Vite
- **Styling**: Emotion (CSS-in-JS)

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chatcraft-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code with ESLint

## Project Structure

```
src/
├── components/
│   ├── Chat/
│   │   ├── WelcomeScreen.tsx    # Initial welcome screen with suggestions
│   │   ├── ChatConversation.tsx # Message history display
│   │   ├── ChatMessage.tsx      # Individual message component
│   │   └── MessageInput.tsx     # Message input with attachments
│   └── Layout/
│       ├── Sidebar.tsx          # Collapsible sidebar navigation
│       └── Header.tsx           # Top header with model selector
├── store/
│   └── chatStore.ts             # Zustand state management
├── theme/
│   └── theme.ts                 # MUI theme configuration
├── types/
│   └── index.ts                 # TypeScript type definitions
├── App.tsx                      # Main application component
├── main.tsx                     # Application entry point
└── index.css                    # Global styles
```

## Features Implementation

### Chat Flow

1. **New Chat Screen**: Users are greeted with a welcome message and suggestion cards
2. **Message Sending**: Clicking a suggestion or typing a message creates a new chat
3. **AI Response**: After sending a message, a simulated AI response appears after a short delay
4. **Conversation History**: Messages are displayed in a scrollable conversation view

### Responsive Design

- **Desktop**: Full sidebar with all features visible
- **Tablet**: Collapsible sidebar with icon-only view
- **Mobile**: Drawer-style sidebar that overlays content

### State Management

The application uses Zustand for state management with the following features:
- Multiple chat sessions
- Message history
- File attachments
- Sidebar state
- Current active chat tracking

## UI Components

- **Sidebar**: Navigation with recent chats, menu items, and user profile
- **Header**: Model selector and action buttons
- **WelcomeScreen**: Greeting and suggestion cards
- **ChatConversation**: Scrollable message history
- **MessageInput**: Text input with file attachment support

## Customization

### Theme

Edit `src/theme/theme.ts` to customize colors, typography, and component styles.

### AI Responses

Modify the `ASSISTANT_RESPONSES` array in `src/store/chatStore.ts` to change simulated responses.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
