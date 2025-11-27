import { Router } from 'express';
import { matchController } from '../controllers/matchController';

const router = Router();

// Get all matches
router.get('/matches', matchController.getAllMatches);

// Get single match
router.get('/matches/:id', matchController.getMatchById);

// SSE - Stream match updates
router.get('/matches/:id/stream', matchController.streamMatch);

// Admin routes
router.put('/matches/:id/score', matchController.updateScore);
router.post('/matches/:id/goals', matchController.addGoal);
router.put('/matches/:id/end', matchController.endMatch);
// Create and delete matches (admin)
router.post('/matches', matchController.createMatch);
router.delete('/matches/:id', matchController.deleteMatch);

export default router;
