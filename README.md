🧠 BeyondChats – AI Article Enhancement Platform
================================================

An end-to-end full-stack application that scrapes blog articles, enhances them using AI by referencing top-ranking content from Google, and presents both original and updated versions in a clean, responsive UI.

📌 Features Overview
--------------------

*   🔍 **Phase 1 – Article Fetching**
    
    *   Scrapes the 5 oldest articles from BeyondChats blog
        
    *   Extracts full original content
        
    *   Stores articles in MongoDB
        
*   ✨ **Phase 2 – AI Enhancement**
    
    *   Updates articles one-by-one via UI
        
    *   Searches Google for top-ranking reference articles
        
    *   Extracts main content using Readability algorithm
        
    *   Rewrites article using Gemini LLM
        
    *   Adds proper references
        
*   🖥️ **Phase 3 – Frontend UI**
    
    *   View original & AI-enhanced articles side-by-side
        
    *   Trigger AI update per article
        
    *   Delete articles
        
    *   Clean, responsive dashboard UI
        

🛠 Tech Stack
-------------

### Backend

*   Node.js
    
*   Express.js
    
*   MongoDB + Mongoose
    
*   Axios
    
*   Cheerio
    
*   @mozilla/readability
    
*   SerpAPI
    
*   Google Gemini API
    

### Frontend

*   React (Vite)
    
*   Tailwind CSS
    
*   React Markdown
    
*   Lucide Icons
    
*   Axios
    

📂 Project Structure
--------------------
```   
BeyondChats/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │       # MongoDB connection setup
│   │   │
│   │   ├── controllers/
│   │   │   └── article.controller.js
│   │   │       # Handles API request & response logic
│   │   │
│   │   ├── models/
│   │   │   └── Article.js
│   │   │       # Article schema (original + updated content)
│   │   │
│   │   ├── routes/
│   │   │   └── article.routes.js
│   │   │       # REST APIs for articles
│   │   │
│   │   ├── services/
│   │   │   ├── articleFetch.service.js
│   │   │   │   # Phase 1: Scrape & store original articles
│   │   │   ├── articleEnhance.service.js
│   │   │   │   # Phase 2: Enhance a single article using AI
│   │   │   ├── articleUpdate.service.js
│   │   │   │   # Fetch original articles for enhancement
│   │   │   ├── googleSearch.service.js
│   │   │   │   # Google search using SerpAPI
│   │   │   ├── readability.service.js
│   │   │   │   # Extract main article content (Readability algorithm)
│   │   │   └── llm.service.js
│   │   │       # Gemini LLM integration
│   │   │
│   │   ├── app.js
│   │   │   # Express app configuration
│   │   └── server.js
│   │       # Backend entry point
│   │
│   ├── .env
│   └── .sample.env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Badge.jsx
│   │   │   │   └── MarkdownRenderer.jsx
│   │   │   │       # Renders AI-enhanced markdown content
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── ArticleCard.jsx
│   │   │   │   ├── ArticleList.jsx
│   │   │   │   └── Dashboard.jsx
│   │   │   │       # Original vs Updated articles view
│   │   │   │
│   │   │   ├── detail/
│   │   │   │   └── DetailView.jsx
│   │   │   │       # Side-by-side comparison view
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   └── NavBar.jsx
│   │   │   │
│   │   │   ├── start/
│   │   │   │   └── StartScreen.jsx
│   │   │   │       # Start Fetching screen
│   │   │   │
│   │   │   └── ui/
│   │   │       └── Toast.jsx
│   │   │           # Error & status notifications
│   │   │
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   │       # Main page & application flow
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │       # Frontend API calls
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│
├── README.md
└── package.json
   
```

🔄 Architecture / Data Flow
---------------------------

```
   ┌─────────────┐  
   │ Frontend UI │  
   │ (React)     │  
   └─────┬───────┘  
         │ API Calls        
         ▼  
    ┌─────────────┐
    │ Backend API │  
    │ (Express)   │  
    └─────┬───────┘  
          │        
          ├─ Phase 1: Scraping        
          │   ├─ BeyondChats Blog        
          │   └─ MongoDB        
          │        
          ├─ Phase 2: Enhancement        
          │   ├─ Google Search (SerpAPI)        
          │   ├─ Readability Extraction        
          │   └─ Gemini LLM        
          │        ▼  
    ┌─────────────┐  
    │ MongoDB     │  
    │ Articles    │  
    └─────────────┘   
   ```

⚙️ Local Setup Instructions
---------------------------

### 1️⃣ Clone Repository

```
git clone https://github.com//beyondchats-assignment.git  
cd beyondchats-assignment  
```

### 2️⃣ Backend Setup

`   cd Backend  npm install   `

Create .env file:

```
PORT=5000  
MONGO_URI=your_mongodb_connection_string  
BACKEND_API_URL=http://localhost:5000/api/articles  
BEYONDCHATS_BASE_URL=https://beyondchats.com 
SERPAPI_KEY=your_serpapi_key  
GEMINI_API_KEY=your_gemini_api_key   
```

Run backend:

`   npm run dev   `

### 3️⃣ Frontend Setup

```
cd frontend  
npm install  
npm run dev   
```

Frontend runs on:

`   http://localhost:5173   `

🚀 How to Use the App
---------------------

1.  Click **“Start Fetching Articles”**
    
2.  Backend scrapes and stores articles
    
3.  Dashboard displays:
    
    *   Original articles
        
    *   Updated articles
        
4.  Click any article to view details
    
5.  Click **Update Article** to enhance using AI
    
6.  View original vs AI-enhanced content side-by-side
    
7.  Delete articles if needed
    

🌍 Live Demo
------------

🔗 **Frontend Live Link:**👉 _Add your deployed frontend URL here (Vercel / Netlify)_

🔗 **Backend API (optional):**👉 _Add backend deployment URL if hosted_

📸 Screenshots (Optional but Recommended)
-----------------------------------------

*   Dashboard View
    
*   Original vs Updated Split View
    
*   AI Update in Progress
    
*   Delete Action
    

(Add images in a /screenshots folder and reference them here)

🧪 Error Handling & Edge Cases
------------------------------

*   Skips websites blocking bot access (403 / Cloudflare)
    
*   Shows user-friendly toast messages on failure
    
*   Prevents duplicate article insertion
    
*   Handles partial scraping failures safely
    

🧼 Code Quality Practices
-------------------------

*   Modular service-based backend architecture
    
*   Single-responsibility services
    
*   Clear separation of controller & business logic
    
*   Clean React component structure
    
*   Meaningful commit history
    

📝 Notes for Reviewers
----------------------

*   Phase 2 runs **per article**, not batch-based
    
*   AI enhancement is **fully UI-triggered**
    
*   Readability algorithm ensures CSS-agnostic scraping
    
*   Gemini output is markdown-rendered properly
    
*   Repo contains frequent commits for progress tracking
    

👤 Author
---------

**Soham Sonwane**  
Full Stack Developer  
📍 India