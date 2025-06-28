export const isNumber = (argument: unknown): boolean => {
  if (argument === null || argument === undefined || argument === '') {
    return false;
  }
  return !isNaN(Number(argument));
};