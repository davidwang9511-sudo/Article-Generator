# Interview Article Generator

A full-stack application that transforms voice or text interviews into polished articles using AI.

## Features

- **Topic-based Interview Generation**: Enter any topic and get 3-5 AI-generated interview questions
- **Dual Input Modes**: Answer questions via voice (speech-to-text) or text input
- **Live Transcript Panel**: Watch your answers appear in real-time
- **AI Article Generation**: Transform your interview responses into a 300-500 word article
- **Modern UI**: Beautiful, responsive design with animations and glass morphism effects

## Tech Stack

### Backend (NestJS)
- **Framework**: NestJS with TypeScript
- **Architecture**: Clean modular architecture with Strategy pattern
- **AI Integration**: OpenAI GPT-3.5 for questions and articles, Whisper for transcription
- **Mock Mode**: Fully functional without API keys using intelligent mocks

### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth transitions
- **Voice**: Web Audio API for recording and visualization

## Project Structure

```
├── backend/                 # NestJS backend
│   └── src/
│       ├── interview/       # Interview questions generation
│       │   ├── strategies/  # OpenAI and Mock strategies
│       │   └── dto/         # Data transfer objects
│       ├── transcription/   # Speech-to-text service
│       │   └── strategies/  # Whisper and Mock strategies
│       └── article/         # Article generation service
│           └── strategies/  # OpenAI and Mock strategies
│
└── frontend/                # Next.js frontend
    └── src/
        ├── app/             # Next.js app router pages
        ├── components/      # React components
        │   ├── ui/          # Reusable UI components
        │   ├── interview/   # Interview-specific components
        │   └── layout/      # Layout components
        ├── hooks/           # Custom React hooks
        ├── lib/             # Utilities and API client
        └── types/           # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies**

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

2. **Configure environment (optional)**

Create a `.env` file in the `backend` folder:

```env
# OpenAI API Key (optional - mock mode will be used if not provided)
OPENAI_API_KEY=your_openai_api_key_here

# Server Port
PORT=4000
```

> **Note**: The application works fully without an API key using intelligent mock responses.

3. **Start the development servers**

```bash
# Terminal 1: Start backend
cd backend
npm run start:dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

4. **Open the application**

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Enter a Topic**: Start by entering a topic you'd like to discuss
2. **Answer Questions**: The AI generates 5 interview questions. Answer each using:
   - **Voice**: Click the microphone to record your answer
   - **Text**: Type your response in the text area
3. **Review Transcript**: Watch your answers appear in the live transcript panel
4. **Generate Article**: After completing all questions, click to generate your article
5. **Copy & Share**: Copy the generated article or start a new interview

## Architecture Highlights

### Strategy Pattern
The backend uses the Strategy pattern for AI services, allowing easy switching between:
- **OpenAI Integration**: Real AI-powered responses with GPT-3.5 and Whisper
- **Mock Strategies**: Intelligent mock responses for development without API keys

### Clean Module Architecture
Each feature is encapsulated in its own NestJS module:
- `InterviewModule`: Question generation
- `TranscriptionModule`: Speech-to-text processing
- `ArticleModule`: Article generation from transcripts

### Type Safety
Full TypeScript coverage on both frontend and backend with shared interfaces and DTOs.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/interview/generate-questions` | Generate interview questions |
| GET | `/api/interview/session/:id` | Get interview session |
| POST | `/api/transcription/transcribe` | Transcribe audio to text |
| POST | `/api/article/generate` | Generate article from transcript |
| GET | `/api/article/:id` | Get generated article |

## Development Notes

- The frontend uses `useInterview` hook for state management
- Voice recording uses MediaRecorder API with real-time audio visualization
- The UI features a custom dark theme with coral and mint accent colors
- All animations are handled by Framer Motion for smooth 60fps transitions

## License

MIT

