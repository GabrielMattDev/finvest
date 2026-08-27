/* ===== FINVEST AUTH MODULE ===== */
window.FINVEST = (function() {
  'use strict';

  const STORAGE_KEY = 'finvest_users';
  const SESSION_KEY = 'finvest_session';

  const PROFILES = {
    admin:    { label: 'administrador', modules: ['FIN','NEW','INV','ADM'] },
    analista: { label: 'analista',      modules: ['FIN','NEW'] },
    usuario:  { label: 'usuário',       modules: ['FIN'] }
  };

  const MODULE_NAMES = {
    FIN: 'gestão financeira',
    NEW: 'notícias',
    INV: 'investimentos',
    ADM: 'administração'
  };

  function initUsers() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const defaultUsers = [
        { username: 'admin',    password: 'admin',    name: 'Administrador', profile: 'admin',    modules: null },
        { username: 'analista', password: 'analista', name: 'Analista',      profile: 'analista', modules: null },
        { username: 'usuario',  password: 'usuario',  name: 'Usuário',       profile: 'usuario',  modules: null }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
    }
  }

  function getUsers() { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  function saveUsers(users) { localStorage.setItem(STORAGE_KEY, JSON.stringify(users)); }
  function setSession(s) { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); }
  function getSessionData() { const r = localStorage.getItem(SESSION_KEY); return r ? JSON.parse(r) : null; }
  function clearSession() { localStorage.removeItem(SESSION_KEY); }

  initUsers();

  return {
    PROFILES, MODULE_NAMES,

    login(username, password) {
      const users = getUsers();
      const user = users.find(u => u.username === username && u.password === password);
      if (!user) return null;
      const modules = user.modules || PROFILES[user.profile].modules;
      const session = { username: user.username, name: user.name, profile: user.profile, modules, timestamp: Date.now() };
      setSession(session);
      return session;
    },

    logout() { clearSession(); window.location.href = 'index.html'; },
    isAuthenticated() { return !!getSessionData(); },
    getSession() { return getSessionData(); },

    guardRoute() {
      if (!this.isAuthenticated()) { window.location.href = 'index.html'; return false; }
      return true;
    },

    getAllowedModules() {
      const session = getSessionData();
      if (!session) return [];
      return session.modules.map(code => ({ code, name: MODULE_NAMES[code] || code }));
    },

    getProfileLabel() {
      const session = getSessionData();
      return session ? (PROFILES[session.profile]?.label || session.profile) : '';
    },

    isAdmin() {
      const session = getSessionData();
      return session && session.profile === 'admin';
    },

    hasModule(code) {
      const session = getSessionData();
      return session ? session.modules.includes(code) : false;
    },

    getAllUsers() { return getUsers(); },

    addUser(username, password, name, profile, customModules) {
      const users = getUsers();
      if (users.find(u => u.username === username)) return false;
      users.push({ username, password, name, profile, modules: customModules || null });
      saveUsers(users);
      return true;
    },

    updateUser(username, updates) {
      const users = getUsers();
      const idx = users.findIndex(u => u.username === username);
      if (idx === -1) return false;
      users[idx] = { ...users[idx], ...updates };
      saveUsers(users);
      return true;
    },

    deleteUser(username) {
      let users = getUsers();
      users = users.filter(u => u.username !== username);
      saveUsers(users);
    }
  };
})();