export const API_URL = "http://localhost:9000";
export function getAllSchools() {
  return fetch(`${API_URL}/school`).then((res) => res.json());
}
export function getUsers() {
  return fetch(`${API_URL}/members`).then((res) => res.json());
}
export function addUser(data) {
  return fetch(`${API_URL}/register`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
export function loginUser(data) {
  return fetch(`${API_URL}/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
