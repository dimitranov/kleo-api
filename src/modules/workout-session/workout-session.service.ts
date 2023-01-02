import mongoose from 'mongoose';
import httpStatus from 'http-status';
import WorkoutService from '../workouts/workout.service';
import { IOptions, QueryResult } from '../paginate/paginate';
import {
  EWorkoutSessionStatus,
  IWorkoutSessionDoc,
  IWorkoutSessionRequest,
  IWorkoutSessionUpdateRequest,
} from './workout-session.interface';
import WorkoutSession from './workout-session.model';
import { IWorkout } from '../workouts/workout.interface';
import { ApiError } from '../errors';

export default class WorkoutSessionsService {
  public static getWorkoutSessionsById = async (id: mongoose.Types.ObjectId): Promise<IWorkoutSessionDoc | null> =>
    WorkoutSession.findById(id);

  public static getWorkoutSessions = async (
    filter: Record<string, any>,
    options: IOptions
  ): Promise<QueryResult<IWorkoutSessionDoc>> => WorkoutSession.paginate(filter, options);

  public static createWorkoutSessions = async (body: IWorkoutSessionRequest): Promise<IWorkoutSessionDoc> => {
    const existingSessions = await WorkoutSessionsService.getWorkoutSessions(
      { owner: body.owner, status: EWorkoutSessionStatus.IN_PROGRES },
      {}
    );

    if (existingSessions.results.length > 0) {
      const existingSession = existingSessions.results[0];
      if (existingSession) {
        await WorkoutSessionsService.updateWorkoutSession(existingSession._id, { status: EWorkoutSessionStatus.ABANDONED });
      }
    }

    return WorkoutSessionsService[
      body.workout ? 'createWorkoutSessionsWithWorkout' : 'createWorkoutSessionsWithEmptyWorkout'
    ](body);
  };

  public static updateWorkoutSession = async (
    id: mongoose.Types.ObjectId,
    body: IWorkoutSessionUpdateRequest
  ): Promise<IWorkoutSessionDoc> => {
    const workoutDoc = await WorkoutSessionsService.getWorkoutSessionsById(new mongoose.Types.ObjectId(id));

    if (!workoutDoc) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Was not able to finish workout session. We are sorry!');
    }

    if (body.status === EWorkoutSessionStatus.COMPLETED || body.status === EWorkoutSessionStatus.ABANDONED) {
      workoutDoc.status = body.status;
      workoutDoc.endTime = new Date();
    }

    await workoutDoc.save();

    return workoutDoc;
  };

  public static createWorkoutSessionsWithWorkout = async (body: IWorkoutSessionRequest): Promise<IWorkoutSessionDoc> => {
    const workoutDoc = await WorkoutService.getWorkoutById(new mongoose.Types.ObjectId(body.workout), {
      skipPopulate: true,
    });

    if (!workoutDoc) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Was not able to create workout session. We are sorry!');
    }

    const newDoc: IWorkout = {
      exercises: workoutDoc.exercises,
      name: workoutDoc.name,
    };

    if (workoutDoc.creator) {
      newDoc.creator = workoutDoc.creator;
    }
    if (workoutDoc.style) {
      newDoc.style = workoutDoc.style;
    }

    if (workoutDoc.level) {
      newDoc.level = workoutDoc.level;
    }

    const newWorkoutDoc = await WorkoutService.createWorkout(newDoc);

    return WorkoutSession.create({ ...body, workout: newWorkoutDoc._id });
  };

  public static createWorkoutSessionsWithEmptyWorkout = async (
    body: IWorkoutSessionRequest
  ): Promise<IWorkoutSessionDoc> => {
    const newWorkoutDoc = await WorkoutService.createWorkout({
      name: body.name,
      exercises: [],
    });

    return WorkoutSession.create({ ...body, workout: newWorkoutDoc._id });
  };
}
