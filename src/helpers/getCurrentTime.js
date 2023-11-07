export const getCurrentDateTime = () => {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0'); // Get the day and format it with 2 digits
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Get the month (0-based) and format it with 2 digits
  const year = now.getFullYear();
  const hour = now.getHours().toString().padStart(2, '0'); // Get the hour and format it with 2 digits
  const minute = now.getMinutes().toString().padStart(2, '0'); // Get the minute and format it with 2 digits
  const second = now.getSeconds().toString().padStart(2, '0'); // Get the second and format it with 2 digits

  const dateTime = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  return dateTime;
};
