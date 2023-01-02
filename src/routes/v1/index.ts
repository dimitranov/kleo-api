import express, { Router } from 'express';
import authRoute from './auth.route';
import docsRoute from './swagger.route';
import userRoute from './user.route';
import devRouter from './dev.router';
import workoutsRouter from './workouts.route';
import workoutSessionsRouter from './workout-sessions.route';
import exercisesRoute from './exercises.route';
import actionableExerciseRoute from './actionable-exercises.route';
import config from '../../config/config';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/exercises',
    route: exercisesRoute,
  },
  {
    path: '/actionable-exercises',
    route: actionableExerciseRoute,
  },
  {
    path: '/workouts',
    route: workoutsRouter,
  },
  {
    path: '/workout-sessions',
    route: workoutSessionsRouter,
  },
];

const devIRoute: IRoute[] = [
  // IRoute available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '/dev',
    route: devRouter,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devIRoute.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;

/**
 * user can make an account
 * user can login
 * user can search and explore exercises
 * user can CRUD a workout sessions
 * user can start and follow a workout sessions
 * user can start an empty workout session and record it on the go
 * user can add info on himsellf and his goals
 * user gets suggestions on workout plans
 * user can track his mesurements and see graphs of progress
 */
