# Fastwork Learn AI Agent

A comprehensive AI agent platform with intelligent search capabilities, workflow orchestration, and modern web interface.

## 🚀 Overview

This project consists of a full-stack AI agent application with:

- **Backend**: AI-powered service using LangChain and LangGraph for workflow orchestration
- **Frontend**: Modern Next.js web application with chat interface
- **Search**: Intelligent search capabilities with Meilisearch integration
- **Workflows**: Automated AI workflows for various tasks

## 📁 Project Structure

```
fw-learn-ai-agent/
├── backend/          # AI Agent backend service
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── middlewares/     # Express middlewares
│   │   ├── models/         # Data models
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript definitions
│   │   ├── utils/          # Utility functions
│   │   └── workflows/      # LangGraph workflows
│   └── package.json
├── frontend/         # Next.js web application
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   ├── utils/        # Utility functions
│   └── package.json
└── README.md
```

## 🛠️ Prerequisites

### Backend Requirements

- **Bun**: 1.2.5 or higher
- **Node.js**: Compatible version for Bun
- **PostgreSQL**: For database storage
- **Redis**: For caching and session management

### Frontend Requirements

- **Node.js**: 18.0.0 or higher
- **Yarn**: Package manager

## ⚙️ Environment Setup

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
OPEN_AI_DEFAULT_API_KEY=your_openai_api_key
DATABASE=your_database_connection_string
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd fw-learn-ai-agent
```

### 2. Backend Setup

```bash
cd backend
bun install
# Set up your .env file
make dev
```

### 3. Frontend Setup

```bash
cd frontend
yarn install
yarn dev
```

### 4. Access the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: Running on the configured port

## 🏗️ Architecture

### Backend Technologies

- **Bun** - JavaScript runtime
- **LangChain** - AI/LLM framework
- **LangGraph** - Workflow orchestration
- **PostgreSQL** - Database
- **Meilisearch** - Search engine
- **TypeScript** - Type safety

### Frontend Technologies

- **Next.js** - React framework
- **React** - UI library
- **TypeScript** - Type safety
- **Chakra UI** - Component library
- **Axios** - HTTP client
- **LangChain** - AI integration
- **React Icons** - Icon library

## 🔧 Development

### Backend Development

The backend service provides AI agent functionality with:

- Search capabilities
- Workflow management
- External integrations
- API endpoints for frontend communication

### Frontend Development

The frontend application features:

- Chat conversation interface
- Search functionality
- Modern UI components
- Responsive design

## 📖 Documentation

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)

## 📄 License

This project is licensed under the MIT License.
