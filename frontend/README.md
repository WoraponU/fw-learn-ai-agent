# Frontend Application

Modern web application built with Next.js for AI Agent interface.

## Overview

This frontend application provides a user-friendly interface for interacting with the AI agent backend service, featuring chat conversations and search functionality.

## Prerequisites

- **Node.js**: 18.0.0 or higher
- **Yarn**: Package manager
- **Backend Service**: Running backend API

## Installation

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Start the development server:

   ```bash
   yarn dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

## Project Structure

```
app/
├── layout.tsx      # Root layout component
├── page.tsx        # Home page
└── globals.css     # Global styles

components/
├── ChatConversation.tsx  # Chat interface
└── ui/                   # UI components
    ├── color-mode.tsx
    ├── provider.tsx
    ├── toaster.tsx
    └── tooltip.tsx

utils/
└── api.ts          # API utilities
```

## Technologies Used

- **Next.js** - React framework
- **React** - UI library
- **TypeScript** - Type safety
- **Chakra UI** - Component library
- **Axios** - HTTP client
- **LangChain** - AI integration
- **React Icons** - Icon library
