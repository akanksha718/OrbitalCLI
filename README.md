# Orbital CLI

Orbital CLI is an AI assistant project with two parts:

- A Node.js command-line app that handles login, device authorization, and chat with AI tools.
- A Next.js web client that provides the sign-in experience, session UI, and the device-flow pages.

The project is built around Better Auth, Prisma, PostgreSQL, and Google Gemini / AI SDK so the CLI and the web app share the same authentication and conversation data.

## What This Project Does

Orbital CLI lets a user:

- Sign in with GitHub through the web app.
- Complete device-flow authentication from the CLI.
- Start an AI chat session from the terminal.
- Use a tool-calling chat mode with optional Google AI tools.
- Store conversations and messages in PostgreSQL through Prisma.

The web app is mainly the login and session surface. The terminal app is the main interaction surface for AI chat.

## Tech Stack

### Frontend

- Next.js 16, used in `client/` for the web UI.
- React 19, used for all client components and page rendering.
- Tailwind CSS 4, used for styling throughout the app.
- shadcn/ui building blocks, used in reusable components under `client/components/ui/`.
- `better-auth/react`, used in `client/lib/auth-client.ts` for session state and sign-in/out.
- `sonner`, used for toast notifications.
- `next-themes`, present in the project for theme handling utilities.

### Backend / CLI

- Node.js ESM, used in `server/` for the CLI and API server.
- Express 5, used in `server/src/index.js` as the HTTP server.
- Commander, used in `server/src/cli/main.js` and command files to expose `orbit` commands.
- Better Auth, used in `server/src/lib/auth.js` and the CLI login flow.
- Prisma 7 with PostgreSQL, used for data access and persistence.
- `@ai-sdk/google` and `ai`, used for Gemini-based chat generation and streaming.
- `marked` and `marked-terminal`, used to render Markdown in the terminal chat UI.
- `chalk`, `boxen`, `@clack/prompts`, and `yocto-spinner`, used to build the terminal experience.

## Where Each Stack Piece Is Used

### `client/`

- `client/app/page.tsx`: protected home page that shows the signed-in user and session state.
- `client/app/(auth)/sign-in/page.tsx`: sign-in screen that routes the user into GitHub OAuth.
- `client/app/device/page.tsx`: device-flow approval page for entering or approving a device code.
- `client/lib/auth-client.ts`: Better Auth client wrapper used by the web app.
- `client/components/login-form.tsx`: GitHub sign-in form UI.
- `client/app/layout.tsx`: root layout for the Next.js app.

### `server/`

- `server/src/index.js`: Express server bootstrap, Better Auth route mounting, `/api/me`, and health check.
- `server/src/lib/auth.js`: Better Auth server configuration and device authorization plugin setup.
- `server/src/lib/db.js`: Prisma client initialization and database connection handling.
- `server/src/services/chat.services.js`: conversation and message persistence.
- `server/src/cli/main.js`: CLI entry point that registers commands.
- `server/src/cli/commands/auth/login.js`: CLI login flow using Better Auth device authorization.
- `server/src/cli/commands/ai/wakeUp.js`: main AI chat command selector.
- `server/src/cli/chat/chat-with-ai.js`: standard terminal chat mode.
- `server/src/cli/chat/chat-with-ai-tool.js`: tool-calling terminal chat mode.
- `server/src/cli/chat/chat-with-ai-agent.js`: agent mode entry point.

### Database

- `server/prisma/schema.prisma`: Prisma schema for users, sessions, accounts, verifications, device codes, conversations, and messages.
- `server/prisma/migrations/`: schema migration history.

## Main Flows

### 1. Sign in from the web

The user opens the Next.js app, clicks GitHub sign-in, and Better Auth creates the session.

### 2. Log in from the CLI

The CLI requests a device code, the user approves it through the web flow, and the CLI stores the token locally for later use.

### 3. Chat with the AI

The CLI loads the authenticated user, opens or creates a conversation, streams responses from the AI model, and stores messages in PostgreSQL.

### 4. Use tools

The tool-calling mode enables Google AI tools such as search or code execution when they are turned on.

## Repository Structure

```text
client/   Next.js web app
server/   Express API, Prisma schema, and CLI
```

## Development Notes

- The backend expects a PostgreSQL database configured through `server/.env`.
- The client talks to the auth backend through `better-auth` and a local proxy/rewrite setup.
- Prisma client generation must be available before running the CLI or API.

## Run It Locally

Start the backend first:

```bash
cd server
npm install
npm run dev
```

Start the web client in another terminal:

```bash
cd client
npm install
npm run dev
```

Then use the CLI from the project root:

```bash
orbital login
orbital wakeup
```

## Environment Variables

The backend uses variables such as:

- `DATABASE_URL`
- `PORT`
- `CLIENT_ORIGIN`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `GOOGLE_GENERATIVE_AI_API_KEY`
- `ORBITAL_MODEL`

## Summary

Orbital CLI is an authenticated AI assistant platform with a browser-based login flow, a terminal-first chat interface, and shared persistence through Prisma and PostgreSQL.