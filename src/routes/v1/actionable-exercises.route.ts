import express, { Router } from 'express';
import ActionableExerciseController from '../../modules/actionable-exercise/actionable-exercise.controller';

const router: Router = express.Router();

router.route('/').post(ActionableExerciseController.create);

router.route('/:id').patch(ActionableExerciseController.update);

router.route('/:id/:setId').patch(ActionableExerciseController.updateSet).delete();

export default router;
