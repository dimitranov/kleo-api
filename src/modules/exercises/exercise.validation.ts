import Joi from 'joi';
import { EExerciseIntensity, EMuscles, IExercise } from './exercise.interface';

const createExerciseBody: Record<keyof IExercise, any> = {
  name: Joi.string().required(),
  muscle: Joi.string().valid(...Object.values(EMuscles)),
  intensity: Joi.string().valid(...Object.values(EExerciseIntensity)),
  description: Joi.string().required(),
};

export const createExercise = {
  body: Joi.object().keys(createExerciseBody),
};

export const getExercise = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// export const getUser = {
//   params: Joi.object().keys({
//     userId: Joi.string().custom(objectId),
//   }),
// };

// export const updateUser = {
//   params: Joi.object().keys({
//     userId: Joi.required().custom(objectId),
//   }),
//   body: Joi.object()
//     .keys({
//       email: Joi.string().email(),
//       password: Joi.string().custom(password),
//       name: Joi.string(),
//     })
//     .min(1),
// };

// export const deleteUser = {
//   params: Joi.object().keys({
//     userId: Joi.string().custom(objectId),
//   }),
// };
