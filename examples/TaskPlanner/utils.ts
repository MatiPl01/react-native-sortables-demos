const defaultFormat = (hours: number, minutes: number) =>
  `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

export const minutesToTime = (
  minutes: number,
  format: (hours: number, minutes: number) => string = defaultFormat
) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return format(hours, remainingMinutes);
};
