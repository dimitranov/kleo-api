import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { ExerciseController } from '../../modules/exercises';
import * as exerciseValidations from '../../modules/exercises/exercise.validation';
import authMiddleware from '../../modules/auth/auth.middleware';

const router: Router = express.Router();

router
  .route('/')
  .post(validate(exerciseValidations.createExercise), ExerciseController.createExercise)
  .get(authMiddleware(), ExerciseController.getAllExercisePaginated);

router.route('/:id').get(ExerciseController.getExercise);

export default router;
