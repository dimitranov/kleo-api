import mongoose, { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export enum EWorkoutStyles {
  FULL_BODY = 'full_body',
  SPLIT = 'split',
}

export enum EWorkoutLevels {
  BEGINNER = 'beginner',
  INTERMEDIET = 'intermediet',
  EXPERIENCED = 'experienced',
  PRO = 'pro',
}

export interface IWorkout {
  exercises: mongoose.Types.ObjectId[];
  creator?: mongoose.Types.ObjectId;
  name: string;
  style?: EWorkoutStyles;
  level?: EWorkoutLevels;
  readOnly?: boolean;
}

export interface IWorkoutDoc extends IWorkout, Document {
  getOptions: () => any;
}

export interface IWorkoutModel extends Model<IWorkoutDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult<IWorkoutDoc>>;
}
