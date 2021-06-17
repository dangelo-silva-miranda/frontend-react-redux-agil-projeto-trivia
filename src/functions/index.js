import md5 from 'crypto-js/md5';

export const toHash = (string) => (
  md5(string).toString()
);

export const saveLocalStorage = (key, data) => (
  localStorage.setItem(key, JSON.stringify(data))
);

export const restoreFromLocalStorage = (key) => {
  const localStorageKey = localStorage.getItem(key);
  if (localStorageKey) {
    return JSON.parse(localStorageKey);
  }
  return [];
};
