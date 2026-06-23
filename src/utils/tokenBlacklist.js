const blacklisted = new Set();

export const add = (token) => {
  if (!token) return false;
  blacklisted.add(token);
  return true;
};

export const has = (token) => {
  if (!token) return false;
  return blacklisted.has(token);
};

export const clear = () => {
  blacklisted.clear();
};

export default { add, has, clear };
