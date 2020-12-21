import { omitBy, isUndefined } from 'lodash';

// eslint-disable-next-line @typescript-eslint/ban-types
export const sanitizeObject = <T extends object>(object: T) =>
  omitBy<T>(object, isUndefined);
