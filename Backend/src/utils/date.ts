export const fiveMinsFromNow = () => new Date(Date.now() + 5 * 60 * 1000);

export const thirtyDaysFromNow = () =>
  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
export const fiveMinsAgo = () => new Date(Date.now() - 5 * 60 * 1000);
