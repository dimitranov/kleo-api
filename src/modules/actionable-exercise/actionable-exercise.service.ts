import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { ApiError } from '../errors';
import Workout from '../workouts/workout.model';
// import WorkoutService from '../workouts/workout.service';
import { IActionableExerciseDoc, IActionableExerciseCreateRequest, SimpleSet } from './actionable-exercise.interface';
import ActionableExercise from './actionable-exercise.model';

export default class ActionableExerciseService {
  public static create = async (
    body: IActionableExerciseCreateRequest,
    workoutId: mongoose.Types.ObjectId
  ): Promise<IActionableExerciseDoc | null> => {
    // const workout = await WorkoutService.getWorkoutById(workoutId, { skipPopulate: true });

    // if (!workout) {
    //   throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Was not able to find workout with id: ${workoutId}`);
    // }

    // const actionableExercise = new ActionableExercise(body);
    // const id = actionableExercise._id;

    // workout.exercises.push(id);

    // await actionableExercise.save();

    // await workout.save();

    // return actionableExercise;

    const actionableExercise = new ActionableExercise(body);
    const id = actionableExercise._id;

    await Workout.findByIdAndUpdate(
      workoutId,
      {
        $push: {
          exercises: id,
        },
      },
      { new: true, useFindAndModify: false }
    );

    await actionableExercise.save();

    return actionableExercise;
  };

  public static updateById = async (
    id: mongoose.Types.ObjectId,
    changes: Partial<IActionableExerciseCreateRequest>
  ): Promise<IActionableExerciseDoc | null> => {
    const doc: IActionableExerciseDoc | null = await ActionableExercise.findById(id);

    if (!doc) {
      throw new ApiError(httpStatus.NOT_FOUND, `Was not able to update exercise with id: ${id}`);
    }

    if (changes.exercise) {
      doc.exercise = changes.exercise;
    }

    if (changes.units) {
      doc.units = changes.units;
    }

    await doc.save();

    return doc;
  };

  public static updateSetById = async (setId: mongoose.Types.ObjectId, changes: SimpleSet) => {
    await ActionableExercise.updateOne(
      { 'sets._id': setId },
      { $set: { 'exercises.$.reps': changes.reps, 'exercises.$.weight': changes.weight } }
    );
  };
}
