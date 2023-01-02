import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { catchAsync, pick } from '../utils';
import WorkoutSessionsService from './workout-session.service';
import { ApiError } from '../errors';
import { IOptions } from '../paginate/paginate';

export default class WorkoutSessionsController {
  public static getWorkoutSessionById = catchAsync(async (req: Request, res: Response) => {
    const result = await WorkoutSessionsService.getWorkoutSessionsById(new mongoose.Types.ObjectId(req.params['id']));
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Workout Sessions not found');
    }
    res.send(result);
  });

  public static getWorkoutSessions = catchAsync(async (req: Request, res: Response) => {
    const filter = pick(req.query, ['status', 'name', 'owner']);
    const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await WorkoutSessionsService.getWorkoutSessions(filter, options);
    res.send(result);
  });

  public static updateWorkoutSession = catchAsync(async (req: Request, res: Response) => {
    const result = await WorkoutSessionsService.updateWorkoutSession(
      new mongoose.Types.ObjectId(req.params['id']),
      req.body
    );
    if (!result) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Something when wrong while saving the workout session!');
    }
    res.send(result);
  });

  public static createWorkoutSessions = catchAsync(async (req: Request, res: Response) => {
    const result = await WorkoutSessionsService.createWorkoutSessions(req.body);
    if (!result) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Something when wrong while saving the workout session!');
    }
    res.status(httpStatus.CREATED).send(result);
  });
}
