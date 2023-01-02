import express, { Router } from 'express';
import DevController from '../../modules/dev/dev.controller';

const router: Router = express.Router();

router.route('/fill').get(DevController.importData);
router.route('/clear').delete(DevController.clearAllData);
router.route('/sets').delete(DevController.transitionExerciseSets);
router.route('/workout-sessions').delete(DevController.clearAllWorkoutSessions);
router.route('/workouts').delete(DevController.clearAllWorkouts);

export default router;
