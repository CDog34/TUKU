const ls = window.localStorage;
export class LocalStorageService {
  static setItem(key, value) {
    const isObject = typeof value === 'object';
    ls.setItem(key, isObject ? JSON.stringify(value) : value);
  }

  static getItem(key) {
    const value = ls.getItem(key);
    try {
      return JSON.parse(value);
    } catch (err) {
      return value;
    }
  }

  static removeItem(key) {
    ls.setItem(key, null);
  }
}
