<div align="center">

<img src="public/logo.png" alt="CodeForge Playground Logo" width="80" />

# CodeForge Playground

**An AI-powered online code editor for modern web development**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-codeforgeplayground.vercel.app-blue?style=for-the-badge&logo=vercel)](https://codeforgeplayground.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io)

</div>

---

## 🚀 Live Demo

👉 **[https://codeforgeplayground.vercel.app](https://codeforgeplayground.vercel.app)**

---

## 📸 Screenshots

### 🏠 Landing Page
![Landing Page](screenshots/landing.png)

### 📊 Dashboard
![Dashboard](screenshots/dashboard.png)

### 💻 Code Editor with Live Preview
![Code Editor](screenshots/editor.png)

### 🤖 Enhanced AI Assistant
![AI Assistant](screenshots/ai-assistant.png)

---

## ✨ Features

- 🧠 **AI Chat Assistant** — Ask questions, get code explanations, reviews, optimizations and debugging help directly inside the editor using Groq AI
- 💡 **AI Code Suggestions** — Real-time intelligent code suggestions powered by Groq
- ▶️ **Live Code Execution** — Run your code instantly in the browser via WebContainer
- 📁 **Multiple Templates** — Start projects with React, Next.js, Express, Vue, Hono, or Angular templates
- 🗂️ **File Explorer** — Navigate and manage your project files just like VS Code
- 💾 **Auto Save** — Your playground is automatically saved to the database
- ⭐ **Star Playgrounds** — Bookmark your favourite playgrounds
- 🔐 **Authentication** — Secure login with Google or GitHub OAuth
- 🌙 **Dark / Light Mode** — Toggle between themes
- 📱 **Responsive Design** — Works across all screen sizes

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS |
| Database | MongoDB Atlas |
| ORM | Prisma 6 |
| Authentication | Auth.js v5 (NextAuth) |
| AI Provider | Groq API |
| Code Execution | WebContainer API |
| Deployment | Vercel |

---

## 📦 Supported Templates

| Template | Description |
|---|---|
| ⚛️ React | Vite-based React starter |
| 🔺 Next.js | Full-stack Next.js app |
| 🟢 Express | Node.js REST API |
| 💚 Vue | Vue 3 starter |
| 🔥 Hono | Lightweight web framework |
| 🔴 Angular | Angular application |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Google OAuth credentials
- GitHub OAuth credentials
- Groq API key

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/codeforge-playground.git
cd codeforge-playground

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Generate Prisma client
npx prisma generate

# 5. Start the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
DATABASE_URL=your_mongodb_connection_string
AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret
GROQ_API_KEY=your_groq_api_key
NEXTAUTH_URL=http://localhost:3000
```

---

## 📁 Project Structure

```
codeforge-playground/
├── app/                        # Next.js App Router
│   ├── (root)/                 # Landing page
│   ├── api/                    # API routes
│   │   ├── auth/               # NextAuth handlers
│   │   ├── chat/               # AI chat endpoint
│   │   ├── code-suggestion/    # AI code suggestions
│   │   ├── run-code/           # Code execution
│   │   └── template/[id]/      # Template loader
│   ├── auth/                   # Sign-in page
│   ├── dashboard/              # User dashboard
│   └── playground/[id]/        # Code editor page
├── components/                 # Reusable UI components
├── features/playground/        # Playground feature logic
├── lib/                        # Shared utilities
│   ├── db.ts                   # Prisma client
│   └── template.ts             # Template path config
├── prisma/
│   └── schema.prisma           # Database schema
├── screenshots/                # README screenshots
│   ├── landing.png
│   ├── dashboard.png
│   ├── editor.png
│   └── ai-assistant.png
└── public/                     # Static assets
```

---

## 🗄️ Database Schema

- **User** — Stores user profile and role (USER / ADMIN / PREMIUM_USER)
- **Account** — OAuth account links (Google, GitHub)
- **Playground** — User-created code playgrounds with template type
- **TemplateFile** — Saved file structure for each playground
- **StarMark** — Starred/bookmarked playgrounds

---

## 🚀 Deployment

This project is deployed on **Vercel**. To deploy your own instance:

1. Push your code to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add all environment variables in Vercel project settings
4. Add your Vercel domain to Google and GitHub OAuth allowed redirect URIs
5. Deploy!

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

Made with ❤️ by **Avinash**

⭐ Star this repo if you found it helpful!

</div>