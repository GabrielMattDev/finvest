/* ===== LOGIN ===== */
function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const errorEl = document.getElementById('login-error');

  const session = FINVEST.login(username, password);

  if (session) {
    window.location.href = 'fin.html';
  } else {
    errorEl.classList.add('show');
    document.getElementById('password').value = '';
    document.getElementById('password').focus();
  }
  return false;
}

// Toggle mostrar/ocultar senha
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-password');
  const passInput = document.getElementById('password');
  const eyeIcon   = document.getElementById('eye-icon');

  if (toggleBtn && passInput) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = passInput.type === 'password';
      passInput.type = isHidden ? 'text' : 'password';
      if (eyeIcon) eyeIcon.textContent = isHidden ? '🙈' : '👁️';
      toggleBtn.setAttribute('aria-label', isHidden ? 'Ocultar senha' : 'Mostrar senha');
    });
  }

  // Se já estiver logado, redireciona
  if (FINVEST.isAuthenticated()) {
    window.location.href = 'fin.html';
  }
});