import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { catchAsync, pick } from '../utils';
import WorkoutService from './workout.service';
import { ApiError } from '../errors';
import { IOptions } from '../paginate/paginate';

export default class WorkoutController {
  public static getWorkoutById = catchAsync(async (req: Request, res: Response) => {
    const result = await WorkoutService.getWorkoutById(new mongoose.Types.ObjectId(req.params['id']));
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Workout not found');
    }
    res.send(result);
  });

  public static getWorkouts = catchAsync(async (req: Request, res: Response) => {
    const filter = pick(req.query, ['level', 'style']);
    const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await WorkoutService.getWorkouts(filter, options);
    res.send(result);
  });

  public static createWorkout = catchAsync(async (req: Request, res: Response) => {
    const result = await WorkoutService.createWorkout(req.body);
    if (!result) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Something when wrong while saving the workout!');
    }
    res.status(httpStatus.CREATED).send(result);
  });

  public static updateWorkout = catchAsync(async (req: Request, res: Response) => {
    const result = await WorkoutService.updateWorkout(new mongoose.Types.ObjectId(req.params['id']), req.body);
    res.status(httpStatus.CREATED).send(result);
  });
}
