import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { ApiError } from '../errors';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IExercise, IExerciseDoc } from './exercise.interface';
import Exercise from './exercise.model';

export default class ExerciseServise {
  public static createExercise = async (body: IExercise): Promise<IExerciseDoc> => {
    if (await Exercise.itExists(body.name)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Exercise already exists!');
    }
    return Exercise.create(body);
  };

  public static getExercise = async (id: mongoose.Types.ObjectId): Promise<IExerciseDoc | null> => Exercise.findById(id);

  public static getAllExercise = async (): Promise<IExerciseDoc[]> => Exercise.find();

  public static getAllExercisePaginated = async (
    filter: Record<string, any>,
    options: IOptions
  ): Promise<QueryResult<IExerciseDoc>> => Exercise.paginate(filter, options);

  public static createBatchExercises = async (data: IExercise[]): Promise<IExerciseDoc[]> => Exercise.create(data);
}
