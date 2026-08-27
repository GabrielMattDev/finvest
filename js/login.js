/* ===== LOGIN ===== */
function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorEl = document.getElementById('login-error');

  const session = FINVEST.login(username, password);

  if (session) {
    window.location.href = 'dashboard.html';
  } else {
    errorEl.classList.add('show');
    document.getElementById('password').value = '';
    document.getElementById('password').focus();
  }
  return false;
}

// Se já estiver logado, redireciona
document.addEventListener('DOMContentLoaded', () => {
  if (FINVEST.isAuthenticated()) {
    window.location.href = 'dashboard.html';
  }
});