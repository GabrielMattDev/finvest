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

function updateStats() {
  const users = FINVEST.getAllUsers();
  document.getElementById('stat-total-users').textContent = users.length;
  document.getElementById('stat-admins').textContent = users.filter(u => u.profile === 'admin').length;
  document.getElementById('stat-analistas').textContent = users.filter(u => u.profile === 'analista').length;
  document.getElementById('stat-usuarios').textContent = users.filter(u => u.profile === 'usuario').length;
}

function renderUsers() {
  const tbody = document.getElementById('users-tbody');
  const users = FINVEST.getAllUsers();

  tbody.innerHTML = users.map(u => {
    const modulesArr = u.modules || FINVEST.PROFILES[u.profile].modules;
    const modulesText = modulesArr.map(m => FINVEST.MODULE_NAMES[m] || m).join(', ');
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

// Profile -> default modules mapping
const PROFILE_DEFAULTS = {
  usuario:  ['FIN'],
  analista: ['FIN','NEW'],
  admin:    ['FIN','NEW','INV','ADM']
};

function onProfileChange() {
  const profile = document.getElementById('new-profile').value;
  const defaults = PROFILE_DEFAULTS[profile] || [];
  document.querySelectorAll('#modules-check input[type="checkbox"]').forEach(cb => {
    cb.checked = defaults.includes(cb.value);
  });
  updatePreview();
}

function getSelectedModules() {
  const checked = [];
  document.querySelectorAll('#modules-check input[type="checkbox"]:checked').forEach(cb => {
    checked.push(cb.value);
  });
  return checked.length > 0 ? checked : null;
}

function updatePreview() {
  const checked = [];
  document.querySelectorAll('#modules-check input[type="checkbox"]:checked').forEach(cb => {
    checked.push(FINVEST.MODULE_NAMES[cb.value] || cb.value);
  });
  document.getElementById('preview-modules').textContent = checked.join(', ') || 'nenhum';
}

function openModal(mode) {
  const modal = document.getElementById('user-modal');
  const title = document.getElementById('modal-title');
  const form = document.getElementById('user-form');

  form.reset();
  document.getElementById('edit-username').value = '';
  document.getElementById('new-username').disabled = false;
  document.getElementById('new-password').placeholder = 'mínimo 4 caracteres';
  document.getElementById('new-password').required = true;

  // Reset checkboxes to usuario default
  onProfileChange();

  if (mode === 'add') {
    title.textContent = 'novo usuário';
  }

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
  document.getElementById('new-password').required = false;
  document.getElementById('new-profile').value = user.profile;

  // Set checkboxes based on user's modules (or profile default)
  const userModules = user.modules || PROFILE_DEFAULTS[user.profile] || [];
  document.querySelectorAll('#modules-check input[type="checkbox"]').forEach(cb => {
    cb.checked = userModules.includes(cb.value);
  });

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
  const customModules = getSelectedModules();

  if (editUserName) {
    // Edit
    const updates = { name, profile, modules: customModules };
    if (password) updates.password = password;
    FINVEST.updateUser(editUserName, updates);
  } else {
    // Add
    if (!password || password.length < 4) {
      alert('a senha deve ter no mínimo 4 caracteres');
      return false;
    }
    const ok = FINVEST.addUser(username, password, name, profile, customModules);
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

// Listeners
document.getElementById('new-profile').addEventListener('change', onProfileChange);
document.querySelectorAll('#modules-check input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', updatePreview);
});

document.getElementById('user-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('user-modal')) closeModal();
});

// Init
document.addEventListener('DOMContentLoaded', () => {
  updateStats();
  renderUsers();
});