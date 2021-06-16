export const saveLocalStorage = (key, data) => (
  localStorage.setItem(key, JSON.stringify(data))
);

export const qualquerCOisa = () => (
  console.log('Só coloquei essa func para não precisar exportar como default')
);
