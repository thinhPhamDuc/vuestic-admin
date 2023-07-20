import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    isSidebarMinimized: false,
    userName: 'Vasili S',
    token: localStorage.getItem('token') || null, // Retrieve the token from localStorage (if exists)
  }),

  getters: {
    getToken(state) {
      return state.token;
    },
  },

  actions: {
    toggleSidebar() {
      this.isSidebarMinimized = !this.isSidebarMinimized
    },

    changeUserName(userName: string) {
      this.userName = userName
    },
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token); // Save the token to localStorage
    },

    clearToken() {
      this.token = null;
      localStorage.removeItem('token'); // Remove the token from localStorage
    },
  },
});
