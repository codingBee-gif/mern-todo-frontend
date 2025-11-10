export function saveAuth({ token, user }) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  const txt = localStorage.getItem("user");
  return txt ? JSON.parse(txt) : null;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
