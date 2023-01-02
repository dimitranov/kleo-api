import mongoose from 'mongoose';
import { IActionableExerciseDoc, IActionableExerciseModel } from './actionable-exercise.interface';
import { UnitsOfMass } from '../utils/commonTypes';

const actionableExerciseSchema = new mongoose.Schema<IActionableExerciseDoc, IActionableExerciseModel>({
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
  },
  sets: {
    type: [
      {
        reps: {
          type: Number,
        },
        weight: {
          type: Number,
        },
      },
    ],
    deafult: [],
  },
  units: {
    type: 'String',
    enum: {
      values: Object.values(UnitsOfMass),
    },
    default: UnitsOfMass.KILOGRAMS,
  },
});

actionableExerciseSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'exercise',
    select: '-__v -_id',
  });

  next();
});

const ActionableExercise = mongoose.model<IActionableExerciseDoc, IActionableExerciseModel>(
  'ActionableExercise',
  actionableExerciseSchema
);

export default ActionableExercise;
