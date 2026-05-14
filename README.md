# RepoMind AI 🚀

RepoMind AI is an AI-powered GitHub repository analyzer that helps developers instantly understand any codebase using Generative AI.

Paste a GitHub repository URL and RepoMind AI will:
- Analyze the project structure
- Detect tech stack
- Explain architecture
- Summarize features
- Enable AI-powered Q&A for the repository

Built with a modern full-stack architecture using React, Node.js, Express, TailwindCSS, and Google Gemini AI.

---

# ✨ Features

- 🔍 GitHub Repository Analysis
- 🤖 AI-Powered Code Understanding
- 💬 Chat with Repository
- 🧠 Tech Stack Detection
- 🏗 Architecture Summarization
- 📂 Recursive Repository File Parsing
- ⚡ Modern AI SaaS UI
- 🌌 Glassmorphism + Animated UI
- 📱 Fully Responsive Design

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- TailwindCSS
- Framer Motion
- React Markdown
- Axios

## Backend
- Node.js
- Express.js
- GitHub REST API
- Google Gemini AI API

---

# 🧠 How It Works

```text
User enters GitHub repo URL
        ↓
Backend fetches repository files
        ↓
Relevant files are filtered
        ↓
Repository context is generated
        ↓
Gemini AI analyzes the codebase
        ↓
Frontend displays AI-generated summary
        ↓
Users can chat with the repository
```

---

# 📂 Project Structure

```bash
RepoMind-AI/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the backend folder.

```env
GEMINI_API_KEY=your_gemini_api_key
GITHUB_TOKEN=your_github_token
```

---

# 🚀 Installation

## 1. Clone Repository

```bash
git clone https://github.com/vanshthapa04/RepoMindAI
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

# ▶️ Run Application

## Start Backend

```bash
cd backend
npm run dev
```

---

## Start Frontend

```bash
cd frontend
npm run dev
```

---



# 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/repo-summary` | Analyze repository |
| POST | `/api/chat` | Chat with repository |

---

# 🚧 Future Improvements

- 📂 Repository Tree Viewer
- 🧠 File-Level AI Explanations
- 🔥 Syntax Highlighted Code Viewer
- 📊 Repository Complexity Analysis
- 🌍 Deployment Support
- 🧵 Streaming AI Responses
- 🔐 Authentication System
- 📁 Multi-Repository Workspace

---

# 🤝 Contributing

Contributions are welcome!

Feel free to fork this repository and submit pull requests.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Vansh Thapa**

- GitHub: https://github.com/vanshthapa04
- LinkedIn: https://www.linkedin.com/in/vansh-thapa-8b0169255/

---

# ⭐ Support

If you found this project helpful, consider giving it a star ⭐
