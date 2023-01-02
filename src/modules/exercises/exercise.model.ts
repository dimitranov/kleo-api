import mongoose from 'mongoose';
import { paginate } from '../paginate';
import { EMuscles, IExerciseDoc, IExerciseModel, EExerciseIntensity } from './exercise.interface';

const exerciseSchema = new mongoose.Schema<IExerciseDoc, IExerciseModel>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  muscle: {
    type: String,
    required: true,
    enum: {
      values: Object.values(EMuscles),
      message: 'Exercise must have a targeded muscle group',
    },
  },
  intensity: {
    type: String,
    required: true,
    enum: {
      values: Object.values(EExerciseIntensity),
      message: 'Exercise must have a intensity mesurment',
    },
  },
  description: {
    type: String,
    required: true,
    default: 'Default description for an exercise.',
  },
});

exerciseSchema.plugin(paginate);

exerciseSchema.static('itExists', async function (name: string): Promise<boolean> {
  const exercise = await this.findOne({ name });
  return !!exercise;
});

const Exercise = mongoose.model<IExerciseDoc, IExerciseModel>('Exercise', exerciseSchema);

export default Exercise;
