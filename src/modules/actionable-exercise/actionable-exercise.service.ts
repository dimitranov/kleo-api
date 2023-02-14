import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { ApiError } from '../errors';
import Workout from '../workouts/workout.model';
import {
  IActionableExerciseDoc,
  IActionableExerciseCreateRequest,
  SimpleSet,
  IActionableExerciseUpdateRequest,
} from './actionable-exercise.interface';
import ActionableExercise from './actionable-exercise.model';

export default class ActionableExerciseService {
  public static create = async (body: IActionableExerciseCreateRequest): Promise<IActionableExerciseDoc | null> => {
    const actionableExercise = new ActionableExercise({ exercise: body.exerciseId });
    const id = actionableExercise._id;

    await Workout.findByIdAndUpdate(
      body.workoutId,
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
    changes: Partial<IActionableExerciseUpdateRequest>
  ): Promise<IActionableExerciseDoc | null> => {
    // const doc: IActionableExerciseDoc | null = await ActionableExercise.findById('2');
    const doc: IActionableExerciseDoc | null = await ActionableExercise.findById(id);

    if (!doc) {
      throw new ApiError(httpStatus.NOT_FOUND, `Was not able to update exercise with id: ${id}`);
    }

    if (changes.exerciseId) {
      doc.exercise = changes.exerciseId;
    }

    // hard update all sets
    if (changes.sets) {
      doc.sets = changes.sets;
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

  public static deleteSetById = async (id: mongoose.Types.ObjectId, setId: mongoose.Types.ObjectId) => {
    await ActionableExercise.findOneAndUpdate({ _id: id }, { $pull: { sets: { _id: setId } } });
  };

  public static addSet = async (id: mongoose.Types.ObjectId, newSet: SimpleSet) => {
    const result = await ActionableExercise.findByIdAndUpdate(
      id,
      {
        $push: {
          sets: newSet,
        },
      },
      { new: true, useFindAndModify: false }
    );
    return result;
  };
}
