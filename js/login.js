function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorEl = document.getElementById('login-error');

  if (username === 'admin' && password === 'admin') {
    localStorage.setItem('finvest_auth', 'true');
    localStorage.setItem('finvest_user', username);
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
  if (localStorage.getItem('finvest_auth') === 'true') {
    window.location.href = 'dashboard.html';
  }
});