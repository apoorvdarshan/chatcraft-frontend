# ChatCraft Frontend

A modern, feature-rich chat application interface built with React, TypeScript, and Material-UI. This project provides a complete ChatGPT-style user experience with a clean, intuitive design.

## ✨ Features

- 🎨 **Modern UI Design** - Clean and elegant interface matching professional chat applications
- 💬 **Interactive Chat** - Real-time chat interface with message history and simulated AI responses
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- 🎯 **Smart Sidebar** - Collapsible navigation with chat history and search functionality
- 📎 **File Attachments** - Drag-and-drop, paste, and click-to-upload file support with progress tracking
- 🔍 **Chat Search** - Real-time search filtering for chat history
- 🎭 **Model Switching** - Toggle between ChatGPT and Claude AI models (UI only)
- ⚡ **Smooth Animations** - Fluid transitions and hover effects throughout
- 🎯 **Suggestion Cards** - Quick-start prompts on the welcome screen

## 🛠 Tech Stack

- **Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI) v5
- **State Management**: Zustand
- **Build Tool**: Vite
- **Styling**: Emotion (CSS-in-JS)
- **Icons**: Material Icons

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16.x or higher)
- **npm** (comes with Node.js)

To check if you have Node.js and npm installed, run:

```bash
node --version
npm --version
```

### Installation & Setup

Follow these steps to get the project running on your local machine:

1. **Clone the repository**

```bash
git clone https://github.com/apoorvdarshan/chatcraft-frontend.git
cd chatcraft-frontend
```

2. **Install dependencies**

```bash
npm install
```

This will install all required packages listed in `package.json`.

3. **Start the development server**

```bash
npm run dev
```

The development server will start at `http://localhost:5173`

4. **Open in browser**

Navigate to `http://localhost:5173` in your web browser. The application should load automatically.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## 📜 Available Scripts

| Command           | Description                                                             |
| ----------------- | ----------------------------------------------------------------------- |
| `npm run dev`     | Start the development server with hot reload at `http://localhost:5173` |
| `npm run build`   | Create an optimized production build in the `dist/` directory           |
| `npm run preview` | Preview the production build locally                                    |
| `npm run lint`    | Run ESLint to check code quality and style                              |

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

## 🎯 How to Use

### Starting a Chat

1. **Welcome Screen**: When you first open the app, you'll see a welcome message and suggestion cards
2. **Quick Start**: Click any suggestion card to start a conversation with that prompt
3. **Custom Message**: Type your own message in the input box at the bottom
4. **Send**: Press Enter or click the send button to submit your message

### File Attachments

You can attach files in three ways:

- **Drag & Drop**: Drag files from your computer onto the main chat area
- **Paste**: Copy a file and paste it (Ctrl+V / Cmd+V) in the text input
- **Click**: Click the attachment icon and select files from your system

### Sidebar Features

- **Search Chats**: Use the search bar to filter your chat history in real-time
- **Collapse/Expand**: Click the arrow icon to toggle between full and icon-only sidebar
- **Recent Chats**: Access your 8 most recent conversations
- **Model Selector**: Switch between ChatGPT 4, ChatGPT 3.5, and Claude (UI only)

### Responsive Behavior

- **Desktop (>900px)**: Full sidebar always visible with collapse option
- **Tablet (600-900px)**: Collapsible sidebar with icon-only collapsed view
- **Mobile (<600px)**: Drawer-style sidebar that slides over content

## ⚙️ Customization

### Changing Theme Colors

Edit `src/theme/theme.ts` to customize the color palette, typography, and component styles:

```typescript
export const theme = createTheme({
  palette: {
    primary: { main: "#4F46E5" }, // Change primary color
    // ... other colors
  },
});
```

### Modifying AI Responses

Update the simulated AI responses in `src/store/chatStore.ts`:

```typescript
const ASSISTANT_RESPONSES = [
  "Your custom response here",
  // Add more responses
];
```

### Updating User Information

Change the username and profile picture in:

- `src/App.tsx` - Update `userName` prop
- `src/components/Layout/Sidebar.tsx` - Update profile image import

## 🌐 Browser Support

This application works on all modern browsers:

| Browser | Version   |
| ------- | --------- |
| Chrome  | Latest ✅ |
| Firefox | Latest ✅ |
| Safari  | Latest ✅ |
| Edge    | Latest ✅ |

## 🐛 Troubleshooting

### Port Already in Use

If you see an error that port 5173 is already in use:

```bash
# Kill the process using the port
# On Mac/Linux:
lsof -ti:5173 | xargs kill -9

# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Dependencies Installation Issues

If `npm install` fails:

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Build Errors

If you encounter TypeScript or build errors:

```bash
# Ensure you're using Node.js 16+
node --version

# Clear dist folder and rebuild
rm -rf dist
npm run build
```

## 📝 Notes

- This is a **frontend-only** implementation with simulated AI responses
- File attachments are shown in the UI but not actually uploaded anywhere
- Chat history is stored in browser memory and will be lost on page refresh
- Model switching (ChatGPT/Claude) is UI-only and doesn't change actual behavior

## 👤 Author

Built with ❤️ by Apoorv Darshan using React, TypeScript, and Material-UI

---

**Need Help?** If you encounter any issues, please check the Troubleshooting section or open an issue in the repository.
