# CURSOR RULES — FULL STACK (React + Node + Express + Prisma)

These rules instruct AI agents to generate clean, modern, consistent, and reliable
full-stack code using React, Node.js, Express, and Prisma. All output should follow
current 2024–2025 standards and avoid legacy patterns.

============================================================
GENERAL CODE STYLE
============================================================
- Always write modern, clean, idiomatic code.
- Never use outdated or deprecated libraries, APIs, or patterns.
- Prefer simple, readable solutions over clever or overly abstract ones.
- Always use TypeScript for both frontend and backend.
- Keep code modular and adhere to the Single Responsibility Principle.
- Never introduce new dependencies without explicit approval.
- Always explain assumptions before large changes.

============================================================
TYPESCRIPT RULES
============================================================
- Use strict TypeScript everywhere.
- Avoid "any" unless explicitly required and justified.
- Always define explicit return types for exported functions.
- Prefer interfaces for objects and type aliases for unions.
- Use ES2024+ syntax.
- Use async/await — never use callbacks or Promise.then chains.
- Use named exports only; avoid default exports.

============================================================
REACT RULES (FRONTEND)
============================================================
- Always use React functional components with hooks.
- Never use class components.
- Use React 18+ features.
- Prefer controlled components for forms.
- For data fetching, use React Query (TanStack Query) or server components (if applicable).
- Avoid using useEffect for data fetching; use React Query instead.
- Keep components small and focused.
- Use Zustand or Context minimally for global state; do NOT use Redux unless explicitly requested.
- Use Tailwind CSS for styling unless otherwise specified.
- Avoid generating overly long Tailwind className strings; keep them readable and grouped logically.
- For routing, follow best practices of the chosen router (React Router or Next.js routing if applicable).

============================================================
CSS RULES (TAILWIND)
============================================================
- Use Tailwind CSS as the default styling system.
- Prefer utility classes over custom CSS.
- Group utility classes logically: layout → spacing → typography → color → misc.
- Avoid repetitive or verbose class blocks; refactor with reusable components when necessary.

============================================================
NODE + EXPRESS BACKEND RULES
============================================================
- Use modern Node.js (v20+).
- Use Express for routing; keep routes thin and clean.
- Move all business logic into service files.
- Controllers should only:
  - validate input
  - call services
  - return responses
- Use async/await throughout the backend.
- Always validate request input using Zod.
- Never mix business logic into routes or controllers.
- Use environment variables for configuration (dotenv or runtime config).
- Structure Express apps with clear separation:
  /routes
  /controllers
  /services
  /repositories (optional)
  /middlewares
  /utils
  /schemas (Zod)
  /prisma
- Always use error-handling middleware; never use try/catch in every controller.

============================================================
DATABASE RULES (PRISMA)
============================================================
- Use Prisma Client for all database access.
- Never write raw SQL unless explicitly requested.
- Avoid N+1 queries; use include/select appropriately.
- Ensure all models are fully typed.
- Validate input before calling Prisma.
- Always handle nullable fields safely.
- Use transactions (prisma.$transaction) when multiple writes must be atomic.
- Follow existing schema conventions; do not create inconsistent naming.

============================================================
ARCHITECTURE & FILE STRUCTURE
============================================================
- Organize code into domain-oriented folders when possible.
- Never write God files or combine unrelated logic.
- Keep controllers small.
- Keep services focused.
- Keep utilities pure and reusable.
- When adding new features, follow the existing project structure.
- Propose architectural changes before implementing them.

============================================================
ERROR HANDLING
============================================================
- Use a global error handler in Express.
- Never swallow errors silently.
- Always return meaningful, typed error objects.
- Validate user input before processing.
- Use early returns instead of deep nesting.

============================================================
AI-SPECIFIC BEHAVIOR RULES (IMPORTANT)
============================================================
- Do NOT hallucinate APIs or functions.
- If unsure about anything, ask for clarification before acting.
- Follow the existing coding patterns and naming conventions in the repository.
- Only modify what the user requests — do not rewrite entire files unless asked.
- When refactoring, preserve functionality exactly unless asked otherwise.
- When generating multiple files, output them clearly and separately.
- Always justify architecture changes.

============================================================
STRICT PROHIBITIONS
============================================================
Do NOT use:
- Class components in React
- Callback-style async patterns
- Legacy Express patterns (app.use(async...))
- Mongoose (Prisma is required)
- Uncontrolled side effects in useEffect
- Redux Toolkit unless explicitly requested
- CommonJS (require, module.exports) — always use ES Modules
- Deprecated lifecycle methods or React patterns
- jQuery or DOM manipulation libraries
