const KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
};

export const sessionService = {
  getUser() {
    try {
      const stored = localStorage.getItem(KEYS.USER);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  getSession() {
    const accessToken = localStorage.getItem(KEYS.ACCESS_TOKEN);
    const user = this.getUser();
    if (!accessToken || !user) return null;
    return { accessToken, user };
  },

  saveSession(accessToken, refreshToken, user) {
    localStorage.setItem(KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(KEYS.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
  },

  clearSession() {
    localStorage.removeItem(KEYS.ACCESS_TOKEN);
    localStorage.removeItem(KEYS.REFRESH_TOKEN);
    localStorage.removeItem(KEYS.USER);
  },

  updateUser(user) {
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
  },
};
