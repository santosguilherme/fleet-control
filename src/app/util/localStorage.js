const localStorageService = {
  get: key => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value))
};

export default localStorageService;
