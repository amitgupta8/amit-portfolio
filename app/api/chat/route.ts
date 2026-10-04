
import { NextResponse } from "next/server";

import {
  site,
  social,
  services,
  process as developmentProcess,
} from "@/data/site";

import { projects } from "@/data/projects";

const technologies = {
  "Next.js": {
    category: "Framework",
    description:
      "React framework for modern full-stack web applications.",
    usage: [
      "App Router",
      "Server and Client Components",
      "API Routes",
      "Dynamic Pages",
      "SEO",
      "Full-stack applications",
    ],
    portfolioUse:
      "Used for Amit.dev and modern full-stack application projects.",
  },

  TypeScript: {
    category: "Programming Language",
    description:
      "Typed superset of JavaScript for safer and maintainable development.",
    usage: [
      "React components",
      "API types",
      "Project models",
      "Form data",
      "Reusable interfaces",
    ],
    portfolioUse:
      "Used throughout modern portfolio and application development.",
  },

  "Node.js": {
    category: "Runtime",
    description:
      "JavaScript runtime used for backend services and APIs.",
    usage: [
      "REST APIs",
      "Authentication",
      "Backend services",
      "Database operations",
    ],
    portfolioUse:
      "Used for backend architecture and API development.",
  },

  MongoDB: {
    category: "Database",
    description:
      "Document database used for application persistence.",
    usage: [
      "User data",
      "CRM records",
      "Application documents",
      "Backend persistence",
    ],
    portfolioUse:
      "Used as the database layer in full-stack applications.",
  },

  "Socket.io": {
    category: "Realtime",
    description:
      "Library for realtime bidirectional communication.",
    usage: [
      "Realtime CRM updates",
      "Activity events",
      "Live notifications",
      "Connected client updates",
    ],
    portfolioUse:
      "Used in the Sales CRM System for realtime updates.",
  },

  React: {
    category: "Frontend Library",
    description:
      "Component-based library for interactive user interfaces.",
    usage: [
      "Reusable components",
      "Interactive UI",
      "Forms",
      "Dashboards",
      "State-driven interfaces",
    ],
    portfolioUse:
      "Used across frontend and full-stack projects.",
  },

  "AI API": {
    category: "AI Integration",
    description:
      "APIs used to add AI-powered functionality to applications.",
    usage: [
      "AI assistants",
      "Natural language Q&A",
      "Summaries",
      "Automation",
      "AI dashboards",
    ],
    portfolioUse:
      "Used for AI portfolio and analytics concepts.",
  },

  Charts: {
    category: "Data Visualization",
    description:
      "Chart components used to present structured data visually.",
    usage: [
      "Analytics dashboards",
      "Revenue charts",
      "Metric visualization",
      "Reports",
    ],
    portfolioUse:
      "Used in dashboard and analytics projects.",
  },

  Tailwind: {
    category: "CSS Framework",
    description:
      "Utility-first CSS framework for responsive interfaces.",
    usage: [
      "Responsive layouts",
      "Dark mode",
      "Animations",
      "Component styling",
    ],
    portfolioUse:
      "Used for modern responsive portfolio and application interfaces.",
  },

  Gemini: {
    category: "Generative AI",
    description:
      "Google generative AI model used for the portfolio assistant.",
    usage: [
      "Portfolio Q&A",
      "Natural-language interaction",
      "AI responses",
      "Context-aware answers",
    ],
    portfolioUse:
      "Used through the server-side /api/chat route.",
  },
};

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function findTechnology(message: string) {
  const text = normalize(message);

  return Object.keys(technologies).find((technology) =>
    text.includes(normalize(technology))
  );
}

function findProject(message: string) {
  const text = normalize(message);

  return projects.find((project) =>
    text.includes(normalize(project.title))
  );
}

function isProjectListQuestion(message: string) {
  const text = normalize(message);

  return (
    text === "projects" ||
    text.includes("all projects") ||
    text.includes("show projects") ||
    text.includes("list projects") ||
    text.includes("project list") ||
    text.includes("projects batao") ||
    text.includes("projects dikhao")
  );
}

function isStackQuestion(message: string) {
  const text = normalize(message);

  return (
    text.includes("skills") ||
    text.includes("technologies") ||
    text.includes("tech stack") ||
    text.includes("technology stack") ||
    text === "stack"
  );
}

function isExperienceQuestion(message: string) {
  const text = normalize(message);

  return (
    text.includes("experience") ||
    text.includes("work history") ||
    text.includes("career")
  );
}

function isEducationQuestion(message: string) {
  const text = normalize(message);

  return (
    text.includes("education") ||
    text.includes("degree") ||
    text.includes("college") ||
    text.includes("qualification") ||
    text.includes("bca")
  );
}

function isContactQuestion(message: string) {
  const text = normalize(message);

  return (
    text.includes("contact") ||
    text.includes("email") ||
    text.includes("phone") ||
    text.includes("hire") ||
    text.includes("reach amit")
  );
}

function isServiceQuestion(message: string) {
  const text = normalize(message);

  return (
    text.includes("service") ||
    text.includes("services") ||
    text.includes("what does amit do") ||
    text.includes("what can amit do")
  );
}

function isAIQuestion(message: string) {
  const text = normalize(message);

  return (
    text.includes("artificial intelligence") ||
    text.includes("ai work") ||
    text.includes("ai project") ||
    text.includes("ai projects") ||
    text.includes("ai integration") ||
    text.includes("generative ai") ||
    text.includes("llm")
  );
}

function getTechnologyDetails(
  name: keyof typeof technologies
) {
  const technology = technologies[name];

  return `## ${name}

**Category**
${technology.category}

### Overview
${technology.description}

### How Amit Uses It
${technology.portfolioUse}

### Usage
${technology.usage
    .map((item) => `- ${item}`)
    .join("\n")}

Click **${name}** again if you want to explore it further.`;
}

function getProjectDetails(
  project: (typeof projects)[number]
) {
  return `## ${project.title}

**Overview**
${project.description}

**Category**
${project.category}

**Year**
${project.year}

**Role**
${project.role}

**Impact**
${project.impact}

### Problem
${project.problem}

### Architecture
${project.architecture
    .map((item) => `- ${item}`)
    .join("\n")}

### Features
${project.features
    .map((item) => `- ${item}`)
    .join("\n")}

### Technology Stack
${project.stack
    .map((item) => `- ${item}`)
    .join("\n")}

### Challenges
${project.challenges
    .map((item) => `- ${item}`)
    .join("\n")}

### Solution
${project.solution}

### Results
${project.results
    .map((item) => `- ${item}`)
    .join("\n")}`;
}

function getProjectsList() {
  return `## Amit's Projects

Project names are clickable. Click any project for complete information.

${projects
  .map(
    (project) =>
      `- **${project.title}** — ${project.description}`
  )
  .join("\n")}`;
}

function getStackDetails() {
  return `## Technologies & Skills

Technology names are clickable.

${Object.keys(technologies)
  .map((technology) => {
    const item =
      technologies[
        technology as keyof typeof technologies
      ];

    return `- **${technology}** — ${item.description}`;
  })
  .join("\n")}`;
}

function getExperienceDetails() {
  return `## Experience

### Shaadi Software Technology
**Delhi · Nov 2025 – Present**

- Full-stack web development
- React / Next.js interfaces
- Backend API integration
- AI-assisted application features

### Webkype Info Services
**Noida · Aug 2023 – Oct 2025**

- Web application development
- React interfaces
- Backend/API workflows
- Responsive UI development`;
}

function getEducationDetails() {
  return `## Education

### BCA
NIET Greater Noida
2020 – 2023
Percentage: 76%

### 12th
2018 – 2020
Percentage: 65%

### 10th
2016 – 2018
Percentage: 60%`;
}

function getContactDetails() {
  return `## Contact Amit

**Email**
${site.email}

**Phone**
${site.phone}

**Location**
${site.location}

**Availability**
${site.availability}

### Social
${social
  .map(
    (item) =>
      `- ${item.label}: ${item.href}`
  )
  .join("\n")}`;
}

function getServicesDetails() {
  return `## Services

${services
  .map(
    (service) =>
      `### ${service.title}

${service.desc}`
  )
  .join("\n\n")}

### Development Process

${developmentProcess
  .map((item, index) => `${index + 1}. ${item}`)
  .join("\n")}`;
}

function getAIWorkDetails() {
  return `## AI Work

Amit works on practical AI integration.

### AI Areas

- AI Portfolio Assistant
- Natural-language Q&A
- AI Analytics
- AI-generated summaries
- API integrations
- LLM workflows

### AI Technologies

- AI API
- Gemini
- TypeScript
- Next.js
- Node.js

The Gemini API key is handled on the server through /api/chat.`;
}

async function askGemini(message: string) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not configured in .env.local"
    );
  }

  const portfolioData = {
    site,
    social,
    services,
    developmentProcess,
    projects,
    technologies,
  };

  const prompt = `
You are Amit Gupta's AI Portfolio Assistant.

Use ONLY the portfolio data below.

Rules:
- Never invent information.
- Do not invent projects, companies, skills, clients or achievements.
- If information is unavailable, say so.
- Answer professionally.
- Match the user's language where possible.
- If asked about a project, give useful project details.
- If asked about technology, explain its portfolio usage.

PORTFOLIO DATA:

${JSON.stringify(portfolioData, null, 2)}

USER QUESTION:

${message}
`;

  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent";

  let lastError = "Gemini request failed.";

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(
        `${endpoint}?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 900,
            },
          }),
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (response.ok) {
        const reply =
          data?.candidates?.[0]?.content?.parts
            ?.map(
              (part: { text?: string }) =>
                part.text || ""
            )
            .join("")
            .trim();

        if (reply) {
          return reply;
        }
      }

      lastError =
        data?.error?.message ||
        "Gemini returned an empty response.";

      if (
        response.status !== 429 &&
        response.status !== 503
      ) {
        break;
      }
    } catch (error) {
      lastError =
        error instanceof Error
          ? error.message
          : "Gemini request failed.";
    }

    if (attempt === 0) {
      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );
    }
  }

  throw new Error(lastError);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const message =
      typeof body?.message === "string"
        ? body.message.trim()
        : "";

    if (!message) {
      return NextResponse.json(
        {
          error: "Message is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Specific technology first
    const technology = findTechnology(message);

    if (technology) {
      return NextResponse.json({
        reply: getTechnologyDetails(
          technology as keyof typeof technologies
        ),
        source: "portfolio",
      });
    }

    // Specific project second
    const project = findProject(message);

    if (project) {
      return NextResponse.json({
        reply: getProjectDetails(project),
        source: "portfolio",
      });
    }

    // Generic portfolio questions
    if (isProjectListQuestion(message)) {
      return NextResponse.json({
        reply: getProjectsList(),
        source: "portfolio",
      });
    }

    if (isStackQuestion(message)) {
      return NextResponse.json({
        reply: getStackDetails(),
        source: "portfolio",
      });
    }

    if (isExperienceQuestion(message)) {
      return NextResponse.json({
        reply: getExperienceDetails(),
        source: "portfolio",
      });
    }

    if (isEducationQuestion(message)) {
      return NextResponse.json({
        reply: getEducationDetails(),
        source: "portfolio",
      });
    }

    if (isContactQuestion(message)) {
      return NextResponse.json({
        reply: getContactDetails(),
        source: "portfolio",
      });
    }

    if (isServiceQuestion(message)) {
      return NextResponse.json({
        reply: getServicesDetails(),
        source: "portfolio",
      });
    }

    if (isAIQuestion(message)) {
      return NextResponse.json({
        reply: getAIWorkDetails(),
        source: "portfolio",
      });
    }

    // Generic question -> Gemini
    const reply = await askGemini(message);

    return NextResponse.json({
      reply,
      source: "gemini",
    });
  } catch (error) {
    console.error("CHAT API ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to process chat request.",
      },
      {
        status: 500,
      }
    );
  }
}
