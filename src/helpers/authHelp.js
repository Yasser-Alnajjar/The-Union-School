function isLoggedIn() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.user) return user.user;
}
function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.accessToken) return `Bearer ${user.accessToken}`;
  return {};
}

export const user = isLoggedIn();
export const header = authHeader();
export const rgxPhone = /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/;
