# Backend Service

AI Agent backend service powered by LangChain + LangGraph.

## Overview

This backend service provides AI agent functionality with search capabilities,
workflow management, and external integrations.

## Prerequisites

- **Bun**: 1.2.5 or higher
- **PostgreSQL**: For database storage

## Environment Variables

Create a `.env` file in the backend directory with the following required
variables:

```env
OPEN_AI_DEFAULT_API_KEY=your_openai_api_key
DATABASE=your_database_connection_string
```

## Installation

1. Install dependencies:

   ```bash
   bun install
   ```

2. Set up environment variables (see above)

3. Start the development server:
   ```bash
   make dev
   ```

## Project Structure

```
src/
├── controllers/     # API controllers
├── middlewares/     # Express middlewares
├── models/         # Data models
├── services/       # Business logic
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── workflows/      # LangGraph workflows
```

## Technologies Used

- **Bun** - JavaScript runtime
- **LangChain** - AI/LLM framework
- **LangGraph** - Workflow orchestration
- **PostgreSQL** - Database
- **Meilisearch** - Search engine
- **TypeScript** - Type safety
