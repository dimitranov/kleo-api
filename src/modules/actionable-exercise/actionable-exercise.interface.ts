import mongoose, { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';
import { UnitsOfMass } from '../utils/commonTypes';

export interface SimpleSet {
  reps: number;
  weight?: number;
}

export interface IActionableExerciseCreateRequest {
  exercise: mongoose.Types.ObjectId; // id
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
