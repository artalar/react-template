export default storeName => ({
  save: store => {
    localStorage.setItem(storeName, JSON.stringify(store || {}));
    return store;
  },
  savePlain: store => {
    localStorage.setItem(storeName, store);
    return store;
  },
  load: (defaultObj = {}) => {
    return JSON.parse(localStorage.getItem(storeName)) || defaultObj;
  },
  loadPlain: () => localStorage.getItem(storeName),
});
