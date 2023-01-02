import express, { Router } from 'express';
import authMiddleware from '../../modules/auth/auth.middleware';
import WorkoutSessionsController from '../../modules/workout-session/workout-session.controller';

const router: Router = express.Router();

router
  .route('/')
  .post(authMiddleware(), WorkoutSessionsController.createWorkoutSessions)
  .get(WorkoutSessionsController.getWorkoutSessions);

router
  .route('/:id')
  .get(authMiddleware(), WorkoutSessionsController.getWorkoutSessionById)
  .patch(authMiddleware(), WorkoutSessionsController.updateWorkoutSession);

export default router;
