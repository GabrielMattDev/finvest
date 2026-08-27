/* ============================================================
   FINVEST — Sistema de Autenticação e Permissões
   ============================================================ */

const MODULES = {
  FIN: { code: 'FIN', name: 'gestão financeira', icon: 'chart' },
  NEW: { code: 'NEW', name: 'notícias',          icon: 'news'  },
  INV: { code: 'INV', name: 'investimentos',     icon: 'trend' },
  ADM: { code: 'ADM', name: 'administração',     icon: 'gear'  }
};

const PROFILES = {
  admin:     { label: 'admin',     modules: ['FIN','NEW','INV','ADM'] },
  analista:  { label: 'analista',  modules: ['FIN','NEW'] },
  usuario:   { label: 'usuário',   modules: ['FIN'] }
};

// Usuários cadastrados (simulação — em produção virá do backend)
const USERS_DB = {
  admin:   { username: 'admin',   password: 'admin',   profile: 'admin',    name: 'Administrador' },
  analista:{ username: 'analista',password: 'analista',profile: 'analista', name: 'Analista' },
  usuario: { username: 'usuario', password: 'usuario', profile: 'usuario',  name: 'Usuário Padrão' }
};

/* ===== AUTH ===== */
function login(username, password) {
  const user = USERS_DB[username.toLowerCase()];
  if (!user || user.password !== password) return null;

  const session = {
    username: user.username,
    name: user.name,
    profile: user.profile,
    modules: PROFILES[user.profile].modules,
    loginAt: new Date().toISOString()
  };
  localStorage.setItem('finvest_session', JSON.stringify(session));
  return session;
}

function logout() {
  localStorage.removeItem('finvest_session');
  window.location.href = 'index.html';
}

function getSession() {
  const raw = localStorage.getItem('finvest_session');
  return raw ? JSON.parse(raw) : null;
}

function isAuthenticated() {
  return getSession() !== null;
}

function guardRoute() {
  if (!isAuthenticated()) {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

/* ===== PERMISSIONS ===== */
function hasModule(moduleCode) {
  const session = getSession();
  return session && session.modules.includes(moduleCode);
}

function isAdmin() {
  const session = getSession();
  return session && session.profile === 'admin';
}

function getAllowedModules() {
  const session = getSession();
  if (!session) return [];
  return session.modules.map(code => MODULES[code]).filter(Boolean);
}

function getProfileLabel() {
  const session = getSession();
  return session ? PROFILES[session.profile].label : '';
}

/* ===== USER MANAGEMENT (Admin only) ===== */
function getAllUsers() {
  return Object.values(USERS_DB).map(u => ({
    username: u.username,
    name: u.name,
    profile: u.profile,
    modules: PROFILES[u.profile].modules
  }));
}

function addUser(username, password, name, profile) {
  if (!isAdmin()) return false;
  if (USERS_DB[username.toLowerCase()]) return false;
  if (!PROFILES[profile]) return false;

  USERS_DB[username.toLowerCase()] = {
    username: username.toLowerCase(),
    password: password,
    name: name,
    profile: profile
  };
  return true;
}

function updateUser(username, updates) {
  if (!isAdmin()) return false;
  const user = USERS_DB[username.toLowerCase()];
  if (!user) return false;

  if (updates.password) user.password = updates.password;
  if (updates.name) user.name = updates.name;
  if (updates.profile && PROFILES[updates.profile]) {
    user.profile = updates.profile;
  }
  return true;
}

function deleteUser(username) {
  if (!isAdmin()) return false;
  if (username.toLowerCase() === 'admin') return false; // protege admin master
  delete USERS_DB[username.toLowerCase()];
  return true;
}

/* ===== EXPORTS ===== */
window.FINVEST = {
  MODULES, PROFILES, USERS_DB,
  login, logout, getSession, isAuthenticated, guardRoute,
  hasModule, isAdmin, getAllowedModules, getProfileLabel,
  getAllUsers, addUser, updateUser, deleteUser
};