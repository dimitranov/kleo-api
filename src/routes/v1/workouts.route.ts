import express, { Router } from 'express';
import WorkoutController from '../../modules/workouts/workout.controller';

const router: Router = express.Router();

router.route('/').post(WorkoutController.createWorkout).get(WorkoutController.getWorkouts);

router.route('/:id').get(WorkoutController.getWorkoutById).patch(WorkoutController.updateWorkout);

export default router;
