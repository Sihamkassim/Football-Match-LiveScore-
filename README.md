# ⚽ Football Match Live Score Streaming

A real-time football match tracking platform built using **Server-Sent Events (SSE)**, **Express.js**, and **React + TypeScript**. The system simulates multiple ongoing football matches and streams live updates (goals, scorers, score changes) to all connected clients instantly — without refreshing the page.

## 🚀 Features

### 🔹 User Features
- View all currently active football matches
- Open any match to watch live score updates
- See goals and scorers appear instantly
- Fully real-time using SSE (no polling, no refresh)

### 🔹 Admin Features
- Update match score
- Add goals and scorer names
- Instantly broadcast updates to all users watching the match

### 🔹 Technical Features
- Express.js backend with TypeScript
- Real-time broadcasting using Server-Sent Events (SSE)
- React + TypeScript frontend with Vite
- Clean modular structure
- No database required (in-memory matches)
- Easy to expand into a real football tracking system

## 🧠 Why SSE?

Unlike regular API apps that send JSON only when the user requests it, SSE keeps a persistent connection from server → client. This allows the backend to push updates instantly, making it perfect for:
- Live sports
- Stock price tickers
- Chat message notifications
- Realtime dashboards

SSE is lightweight, reliable, and supported by browsers without extra libraries.

## 🏗️ Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- Server-Sent Events (SSE)

### Frontend
- React 18
- Vite
- TypeScript
- React Router

## 📂 Project Structure

```
Football/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── matchController.ts
│   │   ├── routes/
│   │   │   └── matchRoutes.ts
│   │   ├── services/
│   │   │   └── sseService.ts
│   │   ├── types/
│   │   │   └── match.ts
│   │   ├── data/
│   │   │   └── matches.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.tsx
    │   │   ├── MatchDetail.tsx
    │   │   └── Admin.tsx
    │   ├── services/
    │   │   ├── matchApi.ts
    │   │   └── sseService.ts
    │   ├── types/
    │   │   └── match.ts
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    └── vite.config.ts
```

## 🌐 How It Works

1. **User opens a match** → frontend opens an SSE connection
2. **Backend registers the client** and keeps the connection alive
3. **When admin updates score** → backend broadcasts the update
4. **All connected clients** instantly receive the update
5. **UI updates in real time** without reload

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```cmd
cd backend
```

2. Install dependencies:
```cmd
npm install
```

3. Start the development server:
```cmd
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```cmd
cd frontend
```

2. Install dependencies:
```cmd
npm install
```

3. Start the development server:
```cmd
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### Public Endpoints
- `GET /api/matches` - Get all matches
- `GET /api/matches/:id` - Get single match
- `GET /api/matches/:id/stream` - SSE stream for match updates

### Admin Endpoints
- `PUT /api/matches/:id/score` - Update match score
- `POST /api/matches/:id/goals` - Add a goal
- `PUT /api/matches/:id/end` - End a match

## 🎮 Usage

1. **Start both servers** (backend and frontend)
2. **Open browser** at `http://localhost:3000`
3. **View all matches** on the home page
4. **Click on a match** to watch live updates
5. **Go to Admin Panel** to update scores and add goals
6. **Watch real-time updates** appear instantly on all connected browsers

## 📝 Example Request (Admin)

### Add a Goal
```bash
curl -X POST http://localhost:5000/api/matches/1/goals \
  -H "Content-Type: application/json" \
  -d '{
    "scorer": "Cristiano Ronaldo",
    "minute": 45,
    "team": "home"
  }'
```

## 🔥 Features to Add (Future)

- User authentication
- Database integration (MongoDB/PostgreSQL)
- Live match commentary
- Player statistics
- Match highlights
- Push notifications
- Mobile app

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ using Server-Sent Events

---

**Enjoy real-time football streaming!** ⚽🔥
"# Football-Match-LiveScore-" 
