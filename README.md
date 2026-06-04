# AI Workplace Productivity Assistant

A modern, responsive web application that helps professionals automate everyday workplace tasks using AI. Built with a clean SaaS-style interface, it provides intelligent tools for writing emails, summarizing meetings, planning tasks, conducting research, and general AI-powered assistance.

## Features

### Smart Email Generator
Generate professional, well-structured business emails in seconds. Provide context, recipient details, and tone preferences to get polished, ready-to-send emails with proper formatting.

### Meeting Notes Summarizer
Transform raw meeting notes or transcripts into organized summaries. Automatically extracts key discussion points, decisions made, action items with owners, and next steps.

### AI Task Planner
Describe your workload or goals and receive a prioritized task plan with estimated timeframes, suggested schedules, and identified potential blockers.

### AI Research Assistant
Get concise, well-structured research briefs with summaries, key points, trade-off considerations, and follow-up questions to guide deeper exploration.

### AI Chatbot Interface
A general-purpose AI assistant for any workplace productivity question. Provides concise, accurate responses with markdown formatting.

### Shared Features
- **Editable AI Outputs**: All generated content can be edited inline before use
- **Markdown Rendering**: Clean, readable formatted output using `react-markdown`
- **Responsive Design**: Fully functional across desktop, tablet, and mobile devices
- **Responsible AI Disclaimer**: Transparent notice on AI-generated outputs
- **Modern Dashboard UI**: Sidebar navigation with consistent tool shells

## Tools Used

| Category | Technology |
|----------|-----------|
| Framework | [TanStack Start](https://tanstack.com/start) v1 — Full-stack React 19 with SSR/SSG |
| Build Tool | [Vite](https://vitejs.dev/) 7 |
| Language | [TypeScript](https://www.typescriptlang.org/) 5.8 (strict mode) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 with custom design tokens |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives) |
| Routing | File-based routing via TanStack Router |
| State & Data | [TanStack Query](https://tanstack.com/query) v5 |
| AI Backend | Lovable AI Gateway (`google/gemini-3-flash-preview`) |
| Markdown | [react-markdown](https://github.com/remarkjs/react-markdown) + `@tailwindcss/typography` |
| Forms | [React Hook Form](https://react-hook-form.com/) with Zod validation |
| Icons | [Lucide React](https://lucide.dev/) |
| Toasts | [Sonner](https://sonner.emilkowal.ski/) |
| Carousel | [Embla Carousel](https://www.embla-carousel.com/) |
| Charts | [Recharts](https://recharts.org/) |

## Setup Instructions

### Prerequisites
- [Bun](https://bun.sh/) (or Node.js with npm/pnpm)

### Installation

1. Clone the repository and navigate into the project directory.

2. Install dependencies:
   ```bash
   bun install
   ```

3. Configure environment variables:
   ```bash
   # Create a .env file in the project root
   cp .env.example .env
   ```

   Required variables:
   ```
   LOVABLE_API_KEY=<your-lovable-ai-gateway-key>
   ```

4. Start the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
bun run build
```

Preview the production build locally:
```bash
bun run preview
```

## Project Structure

```
├── src/
│   ├── components/        # Reusable UI components (sidebar, tool shells, shadcn/ui)
│   ├── hooks/             # Custom React hooks (useAITool, useMobile)
│   ├── lib/               # Utility functions and server-side AI functions
│   ├── routes/            # TanStack Start file-based routes
│   ├── server.ts          # Server entry configuration
│   ├── start.ts           # App start configuration
│   └── styles.css         # Global styles and Tailwind CSS design tokens
├── public/                # Static assets (robots.txt, etc.)
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite build configuration
```

## License

MIT
