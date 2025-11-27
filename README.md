# ⚽ Football Match Live Score Streaming

A real-time football match tracking platform with **Server-Sent Events (SSE)**, **Express.js**, **React + TypeScript**, and **Tailwind CSS**. Watch live scores update instantly without refreshing!

## 🚀 Quick Start

### Installation

1. **Install Backend:**
```cmd
cd backend
npm install
```

2. **Install Frontend:**
```cmd
cd frontend
npm install
```

### Run the App

1. **Start Backend:**
```cmd
cd backend
npm run dev
```
Backend: `http://localhost:5000`

2. **Start Frontend (new terminal):**
```cmd
cd frontend
npm run dev
```
Frontend: `http://localhost:3000`

3. **Open Browser:** `http://localhost:3000`

## 🎯 Features

✅ Real-time score updates using SSE  
✅ Beautiful UI with Tailwind CSS  
✅ Admin panel for match management  
✅ Instant broadcasting to all clients  
✅ TypeScript for type safety  
✅ Simple, clean structure  

## 🏗️ Tech Stack

**Backend:** Node.js + Express + TypeScript + SSE  
**Frontend:** React + Vite + TypeScript + Tailwind CSS + React Router

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

## 🎥 Video Walkthrough

[Watch the video walkthrough](Video-walkthrough/video.mp4)

---
 some screenshots of the project 
 <img width="1000" height="970" alt="image" src="https://github.com/user-attachments/assets/acf2316a-f7a3-454b-aca4-180aa73d3011" />
<img width="1000" height="964" alt="image" src="https://github.com/user-attachments/assets/e47f50fe-c892-4f08-b5dc-3aaeaa9a76bc" />

**Enjoy real-time football streaming!** ⚽🔥
"# Football-Match-LiveScore-" 
