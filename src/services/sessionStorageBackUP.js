export default storeName => ({
  save: store => {
    sessionStorage.setItem(storeName, JSON.stringify(store || {}));
    return store;
  },
  savePlain: store => {
    sessionStorage.setItem(storeName, store);
    return store;
  },
  load: (defaultObj = {}) => {
    return JSON.parse(sessionStorage.getItem(storeName)) || defaultObj;
  },
  loadPlain: () => sessionStorage.getItem(storeName),
});
