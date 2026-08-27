/* ===== ADMIN MODULE ===== */

// Guard
(function() {
  if (!FINVEST.guardRoute()) return;
  if (!FINVEST.isAdmin()) {
    document.getElementById('admin-guard').style.display = 'flex';
    document.getElementById('admin-content').style.display = 'none';
    return;
  }
  document.getElementById('admin-guard').style.display = 'none';
  document.getElementById('admin-content').style.display = 'block';
})();

// Sidebar navigation (permission-based)
function buildSidebar() {
  const nav = document.getElementById('sidebar-nav');
  const modules = FINVEST.getAllowedModules();
  const session = FINVEST.getSession();

  // User info
  document.getElementById('user-avatar').textContent = session.name.charAt(0).toUpperCase();
  document.getElementById('user-name').textContent = session.name;
  document.getElementById('user-profile').textContent = FINVEST.getProfileLabel();

  let html = '';

  modules.forEach(mod => {
    const isActive = mod.code === 'ADM' ? 'active' : '';
    let iconSvg = '';
    if (mod.code === 'FIN') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 3.08496C4.55224 3.08496 4.99993 3.53273 5 4.08496V18.0361H19.9941L20.0967 18.041C20.6008 18.0923 20.9941 18.5185 20.9941 19.0361C20.9941 19.5538 20.6008 19.9799 20.0967 20.0312L19.9941 20.0361H4.08496C3.53273 20.0361 3.08496 19.5884 3.08496 19.0361V4.08496C3.08496 3.53273 3.53273 3.08496 4.08496 3.08496H4ZM7.5 14.5C7.5 14.9142 7.16421 15.25 6.75 15.25C6.33579 15.25 6 14.9142 6 14.5V13.5C6 13.0858 6.33579 12.75 6.75 12.75C7.16421 12.75 7.5 13.0858 7.5 13.5V14.5ZM10.5 14.5C10.5 14.9142 10.1642 15.25 9.75 15.25C9.33579 15.25 9 14.9142 9 14.5V11.5C9 11.0858 9.33579 10.75 9.75 10.75C10.1642 10.75 10.5 11.0858 10.5 11.5V14.5ZM13.5 14.5C13.5 14.9142 13.1642 15.25 12.75 15.25C12.3358 15.25 12 14.9142 12 14.5V9.5C12 9.08579 12.3358 8.75 12.75 8.75C13.1642 8.75 13.5 9.08579 13.5 9.5V14.5ZM16.5 14.5C16.5 14.9142 16.1642 15.25 15.75 15.25C15.3358 15.25 15 14.9142 15 14.5V7.5C15 7.08579 15.3358 6.75 15.75 6.75C16.1642 6.75 16.5 7.08579 16.5 7.5V14.5Z"/></svg>';
    } else if (mod.code === 'NEW') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4C4 3.44772 4.44772 3 5 3H19C19.5523 3 20 3.44772 20 4V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4Z"/><path d="M8 7H16"/><path d="M8 11H16"/><path d="M8 15H12"/></svg>';
    } else if (mod.code === 'INV') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L12 22"/><path d="M12 2L18 8"/><path d="M12 2L6 8"/></svg>';
    } else if (mod.code === 'ADM') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
    }

    const href = mod.code === 'ADM' ? 'adm.html' : 'dashboard.html';
    const onclick = mod.code === 'ADM' ? '' : `onclick="localStorage.setItem('finvest_tab','${mod.code.toLowerCase()}');window.location.href='${href}'"`;
    html += `<button class="nav-item ${isActive}" ${onclick}>${iconSvg}${mod.name}</button>`;
  });

  nav.innerHTML = html;
}

// Stats
function updateStats() {
  const users = FINVEST.getAllUsers();
  document.getElementById('stat-total-users').textContent = users.length;
  document.getElementById('stat-admins').textContent = users.filter(u => u.profile === 'admin').length;
  document.getElementById('stat-analistas').textContent = users.filter(u => u.profile === 'analista').length;
  document.getElementById('stat-usuarios').textContent = users.filter(u => u.profile === 'usuario').length;
}

// Users table
function renderUsers() {
  const tbody = document.getElementById('users-tbody');
  const users = FINVEST.getAllUsers();

  tbody.innerHTML = users.map(u => {
    const modulesText = u.modules.map(m => {
      const names = { FIN: 'gestão financeira', NEW: 'notícias', INV: 'investimentos', ADM: 'administração' };
      return names[m] || m;
    }).join(', ');

    const isProtected = u.username === 'admin';

    return `<tr>
      <td><strong>${u.username}</strong></td>
      <td>${u.name}</td>
      <td><span class="tag ${u.profile}">${u.profile}</span></td>
      <td style="font-size:12px;color:var(--fn-text-2);">${modulesText}</td>
      <td>
        <div class="row-actions">
          <button class="btn-icon" onclick="editUser('${u.username}')">editar</button>
          ${!isProtected ? `<button class="btn-icon delete" onclick="removeUser('${u.username}')">excluir</button>` : '<span style="font-size:11px;color:var(--fn-text-3);">protegido</span>'}
        </div>
      </td>
    </tr>`;
  }).join('');
}

// Modal
function openModal(mode) {
  const modal = document.getElementById('user-modal');
  const title = document.getElementById('modal-title');
  const form = document.getElementById('user-form');

  form.reset();
  document.getElementById('edit-username').value = '';

  if (mode === 'add') {
    title.textContent = 'novo usuário';
    document.getElementById('new-username').disabled = false;
  }

  updatePreview();
  modal.style.display = 'flex';
}

function closeModal() {
  document.getElementById('user-modal').style.display = 'none';
}

function editUser(username) {
  const users = FINVEST.getAllUsers();
  const user = users.find(u => u.username === username);
  if (!user) return;

  document.getElementById('modal-title').textContent = 'editar usuário';
  document.getElementById('edit-username').value = user.username;
  document.getElementById('new-username').value = user.username;
  document.getElementById('new-username').disabled = true;
  document.getElementById('new-name').value = user.name;
  document.getElementById('new-password').value = '';
  document.getElementById('new-password').placeholder = 'deixe em branco para manter';
  document.getElementById('new-profile').value = user.profile;

  updatePreview();
  document.getElementById('user-modal').style.display = 'flex';
}

function saveUser(e) {
  e.preventDefault();
  const editUserName = document.getElementById('edit-username').value;
  const username = document.getElementById('new-username').value.trim().toLowerCase();
  const name = document.getElementById('new-name').value.trim();
  const password = document.getElementById('new-password').value;
  const profile = document.getElementById('new-profile').value;

  if (editUserName) {
    // Edit
    const updates = { name, profile };
    if (password) updates.password = password;
    FINVEST.updateUser(editUserName, updates);
  } else {
    // Add
    if (!password || password.length < 4) {
      alert('a senha deve ter no mínimo 4 caracteres');
      return false;
    }
    const ok = FINVEST.addUser(username, password, name, profile);
    if (!ok) {
      alert('usuário já existe');
      return false;
    }
  }

  closeModal();
  renderUsers();
  updateStats();
  return false;
}

function removeUser(username) {
  if (!confirm(`tem certeza que deseja excluir o usuário "${username}"?`)) return;
  FINVEST.deleteUser(username);
  renderUsers();
  updateStats();
}

// Preview modules on profile change
function updatePreview() {
  const profile = document.getElementById('new-profile').value;
  const modules = FINVEST.PROFILES[profile].modules.map(m => {
    const names = { FIN: 'gestão financeira', NEW: 'notícias', INV: 'investimentos', ADM: 'administração' };
    return names[m];
  }).join(', ');
  document.getElementById('preview-modules').textContent = modules;
}

document.getElementById('new-profile').addEventListener('change', updatePreview);

// Close modal on overlay click
document.getElementById('user-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('user-modal')) closeModal();
});

// Date
function setDate() {
  const now = new Date();
  const el = document.getElementById('current-date');
  if (el) el.textContent = now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();
  updateStats();
  renderUsers();
  setDate();
});