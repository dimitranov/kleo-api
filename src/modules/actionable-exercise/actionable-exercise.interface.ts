import mongoose, { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';
import { UnitsOfMass } from '../utils/commonTypes';

export enum SetType {
  WARMUP = 'warmup',
  DROP = 'drop',
  SUPER = 'super',
  REGULAR = 'regular',
}

export enum SetIntensity {
  VERY_EASY = 'very_easy',
  EASY = 'easy',
  MEDIUM = 'medium',
  MEDIUM_HARD = 'medium_hard',
  HARD = 'hard',
  VERY_HARD = 'very_hard',
}

export interface SimpleSet {
  reps: number;
  weight?: number;
  type?: SetType;
  intensity?: SetIntensity;
}

export interface IActionableExerciseCreateRequest {
  exerciseId: mongoose.Types.ObjectId; // id
  workoutId: mongoose.Types.ObjectId; // id
}

export interface IActionableExerciseUpdateRequest {
  exerciseId: mongoose.Types.ObjectId; // id
  sets: SimpleSet[];
  units: UnitsOfMass;
}

export interface IActionableExercise {
  exercise: mongoose.Types.ObjectId; // id
  sets: SimpleSet[];
  units: UnitsOfMass;
}

export interface IActionableExerciseDoc extends IActionableExercise, Document {}

export interface IActionableExerciseModel extends Model<IActionableExerciseDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult<IActionableExerciseDoc>>;
}
