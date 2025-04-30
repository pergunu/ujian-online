import { CONFIG } from './config.js';

export class Auth {
  static isAdminAuthenticated() {
    return localStorage.getItem('admin_auth') === CONFIG.ADMIN_PASSWORD;
  }

  static authenticate(password) {
    if (password === CONFIG.ADMIN_PASSWORD) {
      localStorage.setItem('admin_auth', password);
      return true;
    }
    return false;
  }

  static logout() {
    localStorage.removeItem('admin_auth');
  }

  static checkAuth() {
    if (!this.isAdminAuthenticated()) {
      window.location.href = '/';
    }
  }
}
