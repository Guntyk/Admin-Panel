export function getCurrentUser(users, id) {
  return users.find((item) => item.id === id);
}
export function changeUserKey(users, id, key, value) {
  const currentUser = getCurrentUser(users, id);
  currentUser[key] = value;
  return [...users];
}
