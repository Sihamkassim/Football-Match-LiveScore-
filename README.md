# ⚽ Football Match Live Score Streaming

A real-time football match tracking platform using **Server-Sent Events (SSE)**. Watch live scores update instantly without refreshing!

## 🎥 Video Walkthrough
[▶️ Watch Video Walkthrough](Video-walkthrough/video.mp4)

## 🚀 Quick Start

**1. Backend**
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:5000
```

**2. Frontend**
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

## 🏗️ Tech Stack
- **Backend:** Node.js, Express, TypeScript, SSE
- **Frontend:** React, Vite, TypeScript, Tailwind CSS

## 🎯 Features
- Real-time score updates (SSE)
- Admin panel for match management
- Responsive UI with Tailwind CSS

## 📡 API Endpoints
- `GET /api/matches` - List matches
- `GET /api/matches/:id/stream` - SSE Stream
- `POST /api/matches/:id/goals` - Add goal (Admin)
- `PUT /api/matches/:id/score` - Update score (Admin)

## 📸 Screenshots
<img width="1000" alt="Home" src="https://github.com/user-attachments/assets/acf2316a-f7a3-454b-aca4-180aa73d3011" />
<img width="1000" alt="Match Detail" src="https://github.com/user-attachments/assets/e47f50fe-c892-4f08-b5dc-3aaeaa9a76bc" />

## 👨‍💻 Author
Built with ❤️ using Server-Sent Events
