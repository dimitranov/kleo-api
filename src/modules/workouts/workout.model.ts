import mongoose from 'mongoose';
import { paginate } from '../paginate';
import { EWorkoutLevels, EWorkoutStyles, IWorkoutDoc, IWorkoutModel } from './workout.interface';

const workoutSchema = new mongoose.Schema<IWorkoutDoc, IWorkoutModel>({
  name: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    enum: Object.values(EWorkoutStyles),
  },
  level: {
    type: String,
    enum: Object.values(EWorkoutLevels),
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ActionableExercise',
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  readOnly: {
    type: Boolean,
  },
});

workoutSchema.plugin(paginate);

workoutSchema.pre('save', function (next) {
  if (this.readOnly) {
    throw new Error('This workout document cannot be updated');
  } else {
    next();
  }
});

workoutSchema.pre(/^find/, function (next) {
  const optiosn = this.getOptions();

  if (optiosn.skipPopulate) {
    console.log('SKIPED POPULATIOn');
    return next();
  }

  this.populate({
    path: 'exercises',
    select: '-__v',
  });

  next();
});

const Workout = mongoose.model<IWorkoutDoc, IWorkoutModel>('Workout', workoutSchema);

export default Workout;
