# LeadPulse AI - B2B Sales Intelligence Platform

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/takeshi1219/LeadPulse-AI&root-directory=apps/web)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/takeshi1219/LeadPulse-AI&root-directory=services/ai-engine)

LeadPulse AI is a modern, AI-powered B2B sales intelligence platform that helps businesses identify, qualify, and convert high-value prospects.
![App Screenshot](https://github.com/takeshi1219/LeadPulse-AI/blob/main/LeadPulseAI.png)
> **📖 [Deployment Guide](./DEPLOYMENT.md)** - Full instructions for deploying to production

## Features

- **AI-Powered Lead Scoring** - Automatically score and prioritize leads using advanced machine learning
- **Sales AI Assistant** - GPT-4 powered chat interface for sales strategy and outreach
- **Smart Insights** - AI-generated company research and recommendations
- **Pipeline Analytics** - Real-time visualizations and conversion metrics
- **Campaign Management** - Create and track email outreach campaigns
- **Team Collaboration** - Multi-user support with role-based access

## Tech Stack

### Frontend (Next.js)
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui + Radix UI
- **Charts:** Recharts
- **State:** Zustand
- **Forms:** React Hook Form + Zod

### Backend
- **Database:** SQLite with Prisma ORM
- **Authentication:** NextAuth.js v5
- **AI Service:** Python FastAPI + LangChain + OpenAI GPT-4

## Project Structure

```
LeadPulse-AI/
├── apps/
│   └── web/                    # Next.js frontend
│       ├── src/
│       │   ├── app/            # App Router pages
│       │   ├── components/     # React components
│       │   └── lib/            # Utilities
│       └── prisma/             # Database schema
├── services/
│   └── ai-engine/              # Python FastAPI AI service
│       ├── agents/             # LangChain agents
│       ├── routes/             # API endpoints
│       └── utils/              # Helpers
└── packages/
    └── shared/                 # Shared types
```

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- OpenAI API Key

### 1. Install Frontend Dependencies

```bash
cd apps/web
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in `apps/web`:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY="sk-your-openai-api-key"
AI_ENGINE_URL="http://localhost:8000"
```

### 3. Initialize Database

```bash
npx prisma migrate dev
npx prisma db seed  # Optional: seed demo data
```

### 4. Start the Frontend

```bash
npm run dev
```

The app will be available at http://localhost:3000

### 5. Set Up AI Engine (Optional)

```bash
cd services/ai-engine
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
```

Create a `.env` file in `services/ai-engine`:

```env
OPENAI_API_KEY="sk-your-openai-api-key"
```

Start the AI service:

```bash
python main.py
```

The AI API will be available at http://localhost:8000

## Pages

| Route | Description |
|-------|-------------|
| `/` | Marketing landing page |
| `/login` | Sign in |
| `/signup` | Create account |
| `/dashboard` | Main analytics dashboard |
| `/leads` | Lead management (table/kanban) |
| `/leads/[id]` | Lead detail with AI insights |
| `/ai-assistant` | Chat with AI sales assistant |
| `/campaigns` | Campaign management |
| `/settings` | Account & team settings |

## AI Agents

The platform includes several specialized AI agents:

1. **Research Agent** - Analyzes company information and provides insights
2. **Scoring Agent** - Rates lead quality based on ICP matching
3. **Outreach Agent** - Generates personalized email templates
4. **Insight Agent** - Provides actionable recommendations

## API Endpoints

### Next.js API Routes
- `POST /api/auth/register` - User registration
- `GET/POST /api/leads` - Lead CRUD
- `GET/PATCH/DELETE /api/leads/[id]` - Single lead operations
- `POST /api/ai/chat` - AI chat proxy

### FastAPI AI Engine
- `POST /api/research` - Company research
- `POST /api/score` - Lead scoring
- `POST /api/outreach` - Outreach generation
- `POST /api/chat` - AI assistant
- `POST /api/insights` - Strategic insights

## Development

### Run Tests
```bash
npm test
```

### Lint & Format
```bash
npm run lint
npm run format
```

### Database Studio
```bash
npx prisma studio
```

## Deployment

### Frontend (Vercel)
1. Connect your repository to Vercel
2. Set environment variables
3. Deploy

### AI Engine (Railway/Render)
1. Create a new Python service
2. Set environment variables
3. Deploy from `services/ai-engine`

## License

MIT License - see LICENSE file for details.

