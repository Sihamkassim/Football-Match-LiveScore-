import express from 'express';
import cors from 'cors';
import matchRoutes from './routes/matchRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', matchRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Football SSE Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 SSE endpoint available at http://localhost:${PORT}/api/matches/:id/stream`);
});

export default app;
