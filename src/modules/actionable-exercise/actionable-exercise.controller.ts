import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { catchAsync } from '../utils';
import ActionableExercisesService from './actionable-exercise.service';
import { ApiError } from '../errors';

export default class ActionableExercisesController {
  public static create = catchAsync(async (req: Request, res: Response) => {
    if (!req.query['workoutId']) {
      throw new ApiError(httpStatus.BAD_REQUEST, '(workoutId) query parameter was no provided!');
    }
    const result = await ActionableExercisesService.create(
      req.body,
      new mongoose.Types.ObjectId(req.query['workoutId'] as string)
    );
    if (!result) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Was not able to create actionabel exercise !');
    }
    res.send(result);
  });

  public static update = catchAsync(async (req: Request, res: Response) => {
    const result = await ActionableExercisesService.updateById(new mongoose.Types.ObjectId(req.params['id']), req.body);
    if (!result) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Was not able to update actionabel exercise !');
    }
    res.send(result);
  });

  public static updateSet = catchAsync(async (req: Request, res: Response) => {
    await ActionableExercisesService.updateSetById(new mongoose.Types.ObjectId(req.params['setId']), req.body);
    res.send(httpStatus.OK);
  });
}
