# Amit.dev — AI • MERN • Full Stack Developer Portfolio

A recruiter-focused Next.js portfolio built with TypeScript and Tailwind CSS. The site prioritizes real project evidence, experience, skills and direct contact instead of placeholder testimonials or illustrative growth metrics.

## Highlights

- Modern responsive portfolio UI with dark/light mode
- Recruiter snapshot with concise, scannable information
- Real project case studies with GitHub/live links shown only when available
- AI portfolio assistant powered through a server-side Gemini API route
- API key stays on the server via `GEMINI_API_KEY`
- Experience, skills, education and contact sections
- Command palette (`Ctrl/Cmd + K`)
- Responsive chat widget
- Resume download
- SEO metadata, sitemap and robots

## AI Chatbot

Create `.env.local`:

```env
GEMINI_API_KEY=your_gemini_api_key
```

The browser calls `/api/chat`; the Gemini key is read only inside the Next.js server route. Never put the API key in `NEXT_PUBLIC_*`.

## Run locally

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

## GitHub

https://github.com/amitgupta8/amit-portfolio
