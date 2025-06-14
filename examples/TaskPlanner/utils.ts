import { SEPARATOR } from './constants';

const defaultFormat = (hours: number, minutes: number) => {
  'worklet';
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const minutesToTime = (
  minutes: number,
  format: (hours: number, minutes: number) => string = defaultFormat
) => {
  'worklet';
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return format(hours, remainingMinutes);
};

export const calculateTotalDurations = (
  indexToKey: Array<string>,
  durations: Record<string, number>
) => {
  const result: Record<string, number> = {};

  let totalDuration = 0;
  for (const key of indexToKey) {
    // We want to finish when the separator is reached
    // (we care only about total durations for selected tasks)
    if (key === SEPARATOR) {
      break;
    }
    const duration = durations[key] ?? 0;
    totalDuration += duration;
    result[key] = totalDuration;
  }

  return result;
};
