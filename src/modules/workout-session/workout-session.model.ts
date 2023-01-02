import mongoose from 'mongoose';
import { IWorkoutSessionDoc, IWorkoutSessionModel, EWorkoutSessionStatus } from './workout-session.interface';
import { paginate } from '../paginate';

const workoutSessionSchema = new mongoose.Schema<IWorkoutSessionDoc, IWorkoutSessionModel>({
  name: {
    type: String,
    required: true,
  },
  workout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(EWorkoutSessionStatus),
    default: EWorkoutSessionStatus.IN_PROGRES,
  },
  startTime: {
    type: Date,
    default: new Date(),
  },
  endTime: {
    type: Date,
  },
});

workoutSessionSchema.plugin(paginate);

workoutSessionSchema.pre(/^find/, function (next) {
  this.populate([
    {
      path: 'workout',
      select: '-__v',
    },
    {
      path: 'owner',
      select: '-role -isEmailVerified -id',
    },
  ]);

  next();
});

const WorkoutSession = mongoose.model<IWorkoutSessionDoc, IWorkoutSessionModel>('WorkoutSession', workoutSessionSchema);

export default WorkoutSession;
