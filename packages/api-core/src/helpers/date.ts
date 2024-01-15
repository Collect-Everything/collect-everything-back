export const dateIsBefore = (date: Date, before: Date) => {
  return date.getTime() < before.getTime();
};

export const dateIsAfter = (date: Date, after: Date) => {
  return date.getTime() > after.getTime();
};

export const dateIsBetween = (date: Date, before: Date, after: Date) => {
  return dateIsAfter(date, before) && dateIsBefore(date, after);
};

export const startOfToday = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};
