export const isAuthenticated = (request) => {
  if (!request.user) {
    throw Error("You need to login to perform that action");
  }
  return;
}