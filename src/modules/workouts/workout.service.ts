import mongoose from 'mongoose';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IWorkout, IWorkoutDoc } from './workout.interface';
import Workout from './workout.model';

export default class WorkoutService {
  public static getWorkoutById = async (id: mongoose.Types.ObjectId, options?: any): Promise<IWorkoutDoc | null> =>
    Workout.findById(id, null, options);

  public static getWorkouts = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult<IWorkoutDoc>> =>
    Workout.paginate(filter, options);

  public static createWorkout = async (body: IWorkout): Promise<IWorkoutDoc> => Workout.create(body);

  public static updateWorkout = async (
    id: mongoose.Types.ObjectId,
    patchData: Partial<IWorkout>
  ): Promise<IWorkoutDoc | null> =>
    Workout.findByIdAndUpdate(id, patchData, {
      new: true,
      runValidators: true,
    });

  public static updateActionableExercises = async (
    id: mongoose.Types.ObjectId,
    patchData: Partial<IWorkout>
  ): Promise<IWorkoutDoc | null> =>
    Workout.findByIdAndUpdate(id, patchData, {
      new: true,
      runValidators: true,
    });
}
