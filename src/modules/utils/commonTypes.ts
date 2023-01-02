export enum UnitsOfMass {
  KILOGRAMS = 'kg',
  POUNDS = 'lbs',
}
const K = 0.45359237;

export const poundToKg = (lbs: number) => {
  if (!lbs) return 0;
  return lbs * K;
};

export const kgToPound = (kg: number) => {
  if (!kg) return 0;
  return kg / K;
};
