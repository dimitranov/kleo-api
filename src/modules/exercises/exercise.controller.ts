import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ExerciseServise from './exercise.service';
import { ApiError } from '../errors';
import { logger } from '../logger';
import { pick } from '../utils';
import { IOptions } from '../paginate/paginate';

export default class ExerciseController {
  public static createExercise = catchAsync(async (req: Request, res: Response) => {
    const result = await ExerciseServise.createExercise(req.body);
    logger.info(result);
    res.status(httpStatus.CREATED).send(result);
  });

  public static getExercise = catchAsync(async (req: Request, res: Response) => {
    const result = await ExerciseServise.getExercise(new mongoose.Types.ObjectId(req.params['id']));
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(result);
  });

  public static getAllExercise = catchAsync(async (_req: Request, res: Response) => {
    const result = await ExerciseServise.getAllExercise();
    res.send(result);
  });

  public static getAllExercisePaginated = catchAsync(async (req: Request, res: Response) => {
    console.log(req.cookies);
    const filter = pick(req.query, ['name', 'muscle']);
    const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await ExerciseServise.getAllExercisePaginated(filter, options);
    res.send(result);
  });
}
