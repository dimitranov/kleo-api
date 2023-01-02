/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ActionableExercise from '../actionable-exercise/actionable-exercise.model';
import { Exercise } from '../exercises';
import { catchAsync } from '../utils';
import WorkoutSession from '../workout-session/workout-session.model';
import Workout from '../workouts/workout.model';

const exerciseData = [
  {
    name: 'Bench Press',
    muscle: 'chest',
    intensity: 'high',
    description: 'Rendom text description',
  },
  {
    name: 'Flys',
    muscle: 'chest',
    intensity: 'medium',
    description: 'Rendom text description',
  },
  {
    name: 'Dumbell Bench Press',
    muscle: 'chest',
    intensity: 'low',
    description: 'Rendom text description',
  },
  {
    name: 'Pull-ups',
    muscle: 'back',
    intensity: 'high',
    description: 'Rendom text description',
  },
  {
    name: 'Bend-over Rows',
    muscle: 'back',
    intensity: 'high',
    description: 'Rendom text description',
  },
  {
    name: 'Seated Rows',
    muscle: 'back',
    intensity: 'medium',
    description: 'Rendom text description',
  },
  {
    name: 'Back cabel pulls',
    muscle: 'back',
    intensity: 'low',
    description: 'Rendom text description',
  },
  {
    name: 'Squat',
    muscle: 'legs',
    intensity: 'high',
    description: 'Rendom text description',
  },
  {
    name: 'Seated Leg Press',
    muscle: 'legs',
    intensity: 'medium',
    description: 'Rendom text description',
  },
  {
    name: 'Hamstring Extensions',
    muscle: 'legs',
    intensity: 'low',
    description: 'Rendom text description',
  },
  {
    name: 'Quad extensions',
    muscle: 'legs',
    intensity: 'low',
    description: 'Rendom text description',
  },
];

export default class DevController {
  static clearAllData = catchAsync(async (_req: Request, res: Response) => {
    const result = await Exercise.deleteMany();
    res.status(httpStatus.NO_CONTENT).send(result);
  });

  static importData = catchAsync(async (_req: Request, res: Response) => {
    const result = await Exercise.create(exerciseData);
    res.status(httpStatus.CREATED).send(result);
  });

  static transitionExerciseSets = catchAsync(async (_req: Request, res: Response) => {
    await ActionableExercise.deleteMany({});
    res.status(httpStatus.OK).send({});
  });

  static clearAllWorkoutSessions = catchAsync(async (_req: Request, res: Response) => {
    await WorkoutSession.deleteMany({});
    res.status(httpStatus.OK).send({});
  });

  static clearAllWorkouts = catchAsync(async (_req: Request, res: Response) => {
    await Workout.deleteMany({});
    res.status(httpStatus.OK).send({});
  });
}
