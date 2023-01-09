export const getDurationYears = (value) => {
  const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const stakeDate = new Date(value * 1000);
  const year = stakeDate.getFullYear();
  const month = MONTH[stakeDate.getMonth()];
  const day = stakeDate.getDate();
  return `${day} ${month} ${year}`;
};
export const getDurationMonths = (value) => {
  const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const stakeDate = new Date(value * 1000);
  const month = MONTH[stakeDate.getMonth()];
  const day = stakeDate.getDate();
  return `${day} ${month}`;
};
export const getDurationHours = (value) => {
  const stakeDate = new Date(value * 1000);
  const hour = stakeDate.getHours();
  const min = stakeDate.getMinutes();
  return `${hour} : ${min}`;
};
export const getDurationDays = (value) => {
  const stakeDate = new Date(value * 1000);
  const day = stakeDate.getDate();
  return `${day}`;
};
export const getYM = (value) => {
  const stakeDate = new Date(value * 1000);
  const year = stakeDate.getFullYear();
  const month = stakeDate.getMonth();
  return { year, month };
};
