import { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export enum EMuscles {
  CHEST = 'chest',
  LEGS = 'legs',
  BACK = 'back',
}

export enum EExerciseIntensity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface IExercise {
  name: string;
  muscle: EMuscles;
  intensity: EExerciseIntensity;
  description: string;
}

export interface IExerciseDoc extends IExercise, Document {}
export interface IExerciseModel extends Model<IExerciseDoc> {
  itExists(name: string): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult<IExerciseDoc>>;
}
