export const isLoggedIn = (cookies) => {
  const authToken = cookies['sb-blzuxhmlkcjuqlksdyge-auth-token'];
  return !!authToken; // Return true if authToken exists, otherwise false
};