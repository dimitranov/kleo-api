import mongoose, { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export enum EWorkoutSessionStatus {
  IN_PROGRES = 'in-progress',
  COMPLETED = 'completed',
  PAUSES = 'pauses',
  ABANDONED = 'abandoned',
}

export interface IWorkoutSessionRequest {
  workout?: string;
  name: string;
  owner: string;
  status?: EWorkoutSessionStatus;
}

export interface IWorkoutSessionUpdateRequest {
  workout?: string;
  name?: string;
  status?: EWorkoutSessionStatus;
}

export interface IWorkoutSession {
  name: string;
  workout: mongoose.Schema.Types.ObjectId;
  owner: mongoose.Schema.Types.ObjectId;
  status: EWorkoutSessionStatus;
  startTime: Date;
  endTime: Date;
}

export interface IWorkoutSessionDoc extends IWorkoutSession, Document {}

export interface IWorkoutSessionModel extends Model<IWorkoutSessionDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult<IWorkoutSessionDoc>>;
}
