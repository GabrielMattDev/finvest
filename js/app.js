/* ===== DASHBOARD APP ===== */

// Auth guard
(function() {
  if (!FINVEST.guardRoute()) return;
})();

/* ===== DATA ===== */
const investments = [
  { name: 'CDB Banco XYZ', rate: 1.24, type: 'cdi', cdi: 0.1075 },
  { name: 'Tesouro Selic 2029', rate: 1.10, type: 'selic', cdi: 0.1075 },
  { name: 'Fundo Multimercado Alfa', rate: 0.184, type: 'fixed' },
  { name: 'LCI Banco ABC', rate: 1.18, type: 'cdi', cdi: 0.1075 },
  { name: 'Tesouro IPCA+ 2035', rate: 0.0612, type: 'ipca', ipca: 0.045 }
];

const patrimonyData = [98000, 102000, 105500, 108000, 112000, 115500, 118000, 121000, 125000, 130000, 138000, 142850];
const months = ['set', 'out', 'nov', 'dez', 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago'];

/* ===== SIDEBAR (permission-based) ===== */
function buildSidebar() {
  const nav = document.getElementById('sidebar-nav');
  const modules = FINVEST.getAllowedModules();
  const session = FINVEST.getSession();

  // User info
  document.getElementById('user-avatar').textContent = session.name.charAt(0).toUpperCase();
  document.getElementById('user-name').textContent = session.name;
  document.getElementById('user-profile').textContent = FINVEST.getProfileLabel();
  document.getElementById('profile-badge').textContent = FINVEST.getProfileLabel();

  let html = '';
  modules.forEach(mod => {
    if (mod.code === 'ADM') return; // ADM vai pra adm.html
    let iconSvg = '';
    if (mod.code === 'FIN') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 3.08496C4.55224 3.08496 4.99993 3.53273 5 4.08496V18.0361H19.9941L20.0967 18.041C20.6008 18.0923 20.9941 18.5185 20.9941 19.0361C20.9941 19.5538 20.6008 19.9799 20.0967 20.0312L19.9941 20.0361H4.08496C3.53273 20.0361 3.08496 19.5884 3.08496 19.0361V4.08496C3.08496 3.53273 3.53273 3.08496 4.08496 3.08496H4ZM7.5 14.5C7.5 14.9142 7.16421 15.25 6.75 15.25C6.33579 15.25 6 14.9142 6 14.5V13.5C6 13.0858 6.33579 12.75 6.75 12.75C7.16421 12.75 7.5 13.0858 7.5 13.5V14.5ZM10.5 14.5C10.5 14.9142 10.1642 15.25 9.75 15.25C9.33579 15.25 9 14.9142 9 14.5V11.5C9 11.0858 9.33579 10.75 9.75 10.75C10.1642 10.75 10.5 11.0858 10.5 11.5V14.5ZM13.5 14.5C13.5 14.9142 13.1642 15.25 12.75 15.25C12.3358 15.25 12 14.9142 12 14.5V9.5C12 9.08579 12.3358 8.75 12.75 8.75C13.1642 8.75 13.5 9.08579 13.5 9.5V14.5ZM16.5 14.5C16.5 14.9142 16.1642 15.25 15.75 15.25C15.3358 15.25 15 14.9142 15 14.5V7.5C15 7.08579 15.3358 6.75 15.75 6.75C16.1642 6.75 16.5 7.08579 16.5 7.5V14.5Z"/></svg>';
    } else if (mod.code === 'NEW') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4C4 3.44772 4.44772 3 5 3H19C19.5523 3 20 3.44772 20 4V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4Z"/><path d="M8 7H16"/><path d="M8 11H16"/><path d="M8 15H12"/></svg>';
    } else if (mod.code === 'INV') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L12 22"/><path d="M12 2L18 8"/><path d="M12 2L6 8"/></svg>';
    }
    html += `<button class="nav-item" data-tab="${mod.code.toLowerCase()}" onclick="switchTab('${mod.code.toLowerCase()}')">${iconSvg}${mod.name}</button>`;
  });

  // Admin link
  if (FINVEST.isAdmin()) {
    html += `<button class="nav-item" onclick="window.location.href='adm.html'">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      administração
    </button>`;
  }

  nav.innerHTML = html;
}

/* ===== TABS ===== */
function switchTab(tab) {
  // Permission check
  const code = tab === 'finance' ? 'FIN' : tab === 'news' ? 'NEW' : tab === 'invest' ? 'INV' : '';
  if (code && !FINVEST.hasModule(code)) {
    alert('você não tem permissão para acessar este módulo');
    return;
  }

  document.querySelectorAll('.nav-item').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(s => s.classList.remove('active'));

  const btn = document.querySelector('.nav-item[data-tab="' + tab + '"]');
  if (btn) btn.classList.add('active');

  const section = document.getElementById('tab-' + tab);
  if (section) section.classList.add('active');

  const titles = {
    finance: 'gestão financeira',
    news: 'notícias do mercado',
    invest: 'investimentos e simulação'
  };
  document.getElementById('page-title').textContent = titles[tab] || '';
}

/* ===== DATE ===== */
function setDate() {
  const now = new Date();
  const el = document.getElementById('current-date');
  if (el) el.textContent = now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

/* ===== PATRIMONY CHART ===== */
function drawPatrimonyChart() {
  const svg = document.getElementById('chart-patrimony');
  if (!svg) return;
  const min = 90000, max = 150000;
  const w = 440, h = 170, x0 = 40, y0 = 20;
  let d = '', area = 'M' + x0 + ',' + (y0 + h);
  const pts = [];

  for (let i = 0; i < patrimonyData.length; i++) {
    const x = x0 + (i / (patrimonyData.length - 1)) * w;
    const y = y0 + h - ((patrimonyData[i] - min) / (max - min)) * h;
    pts.push({x, y, val: patrimonyData[i]});
    if (i === 0) { d += 'M' + x + ',' + y; area += ' L' + x + ',' + y; }
    else { d += ' L' + x + ',' + y; area += ' L' + x + ',' + y; }
  }
  area += ' L' + (x0 + w) + ',' + (y0 + h) + ' Z';

  document.getElementById('line-path').setAttribute('d', d);
  document.getElementById('area-path').setAttribute('d', area);

  const g = document.getElementById('chart-points');
  g.innerHTML = '';
  pts.forEach((p, i) => {
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('cx', p.x); c.setAttribute('cy', p.y); c.setAttribute('r', '3.5');
    c.setAttribute('fill', '#22c55e'); c.setAttribute('stroke', '#111b2e');
    c.setAttribute('stroke-width', '2');
    g.appendChild(c);
    if (i % 2 === 0) {
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t.setAttribute('x', p.x); t.setAttribute('y', y0 + h + 16);
      t.setAttribute('text-anchor', 'middle'); t.setAttribute('fill', '#64748b');
      t.setAttribute('font-size', '9'); t.textContent = months[i];
      g.appendChild(t);
    }
  });
}

/* ===== DONUT CHART ===== */
function drawDonutChart() {
  const data = [
    { label: 'Alimentação', value: 28, color: '#3b82f6' },
    { label: 'Moradia', value: 22, color: '#22c55e' },
    { label: 'Transporte', value: 15, color: '#a855f7' },
    { label: 'Lazer', value: 12, color: '#ef4444' },
    { label: 'Saúde', value: 10, color: '#64748b' },
    { label: 'Educação', value: 8, color: '#eab308' },
    { label: 'Outros', value: 5, color: '#475569' }
  ];
  const g = document.querySelector('#chart-donut g');
  if (!g) return;
  let start = 0;
  const total = data.reduce((s, d) => s + d.value, 0);

  data.forEach(d => {
    const angle = (d.value / total) * 2 * Math.PI;
    const x1 = Math.cos(start) * 70, y1 = Math.sin(start) * 70;
    const x2 = Math.cos(start + angle) * 70, y2 = Math.sin(start + angle) * 70;
    const large = angle > Math.PI ? 1 : 0;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 0 0 L ' + x1 + ' ' + y1 + ' A 70 70 0 ' + large + ' 1 ' + x2 + ' ' + y2 + ' Z');
    path.setAttribute('fill', d.color);
    g.appendChild(path);
    start += angle;
  });

  const hole = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  hole.setAttribute('r', '45'); hole.setAttribute('fill', '#111b2e');
  g.appendChild(hole);
}

/* ===== SIMULATOR ===== */
function selectInvest(idx) {
  document.getElementById('sim-invest').value = idx;
  document.getElementById('sim-result').style.display = 'none';
}

function runSimulation() {
  const investIdx = parseInt(document.getElementById('sim-invest').value);
  const amount = parseFloat(document.getElementById('sim-amount').value) || 0;
  const monthly = parseFloat(document.getElementById('sim-monthly').value) || 0;
  const monthsCount = parseInt(document.getElementById('sim-period').value);
  const inv = investments[investIdx];

  let monthlyRate;
  if (inv.type === 'cdi') monthlyRate = Math.pow(1 + inv.rate * inv.cdi, 1/12) - 1;
  else if (inv.type === 'selic') monthlyRate = Math.pow(1 + inv.rate * inv.cdi, 1/12) - 1;
  else if (inv.type === 'ipca') monthlyRate = Math.pow(1 + inv.rate + inv.ipca, 1/12) - 1;
  else monthlyRate = Math.pow(1 + inv.rate, 1/12) - 1;

  let total = amount;
  let invested = amount;
  const history = [{ month: 0, total: amount, invested: amount }];

  for (let m = 1; m <= monthsCount; m++) {
    total = total * (1 + monthlyRate) + monthly;
    invested += monthly;
    history.push({ month: m, total: total, invested: invested });
  }

  const finalVal = total;
  const gain = finalVal - invested;

  document.getElementById('sim-final').textContent = 'R$ ' + finalVal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  document.getElementById('sim-detail').textContent =
    'Total investido: R$ ' + invested.toLocaleString('pt-BR', {minimumFractionDigits: 2}) +
    ' | Rendimento: R$ ' + gain.toLocaleString('pt-BR', {minimumFractionDigits: 2});
  document.getElementById('sim-result').style.display = 'block';

  const maxVal = Math.max(...history.map(h => h.total));
  const w = 250, h = 120, x0 = 30, y0 = 20;
  let d = '', area = 'M' + x0 + ',' + (y0 + h);
  const pts = [];
  const step = Math.max(1, Math.floor(history.length / 8));

  for (let i = 0; i < history.length; i += step) {
    const x = x0 + (history[i].month / monthsCount) * w;
    const y = y0 + h - (history[i].total / maxVal) * h;
    pts.push({x, y, val: history[i].total, month: history[i].month});
    if (i === 0) { d += 'M' + x + ',' + y; area += ' L' + x + ',' + y; }
    else { d += ' L' + x + ',' + y; area += ' L' + x + ',' + y; }
  }

  const lastPt = history[history.length - 1];
  const lastX = x0 + w, lastY = y0 + h - (lastPt.total / maxVal) * h;
  d += ' L' + lastX + ',' + lastY; area += ' L' + lastX + ',' + lastY;
  area += ' L' + lastX + ',' + (y0 + h) + ' Z';

  document.getElementById('sim-line').setAttribute('d', d);
  document.getElementById('sim-area').setAttribute('d', area);

  const g = document.getElementById('sim-points');
  g.innerHTML = '';
  pts.forEach((p, i) => {
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('cx', p.x); c.setAttribute('cy', p.y); c.setAttribute('r', '3');
    c.setAttribute('fill', '#22c55e'); c.setAttribute('stroke', '#111b2e');
    c.setAttribute('stroke-width', '2');
    g.appendChild(c);
    if (i % 2 === 0) {
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t.setAttribute('x', p.x); t.setAttribute('y', y0 + h + 14);
      t.setAttribute('text-anchor', 'middle'); t.setAttribute('fill', '#64748b');
      t.setAttribute('font-size', '8'); t.textContent = 'm' + p.month;
      g.appendChild(t);
    }
  });
}

/* ===== FILE UPLOAD ===== */
function handleFileUpload(input) {
  const status = document.getElementById('upload-status');
  if (input.files && input.files[0]) {
    const file = input.files[0];
    status.style.display = 'block';
    status.innerHTML = '<span style="color:#22c55e;font-weight:600;">✓</span> "' + file.name + '" carregado! 47 transações importadas, 8 categorias, saldo atualizado.';
  }
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();

  // Drag & drop
  const dropzone = document.getElementById('excel-dropzone');
  if (dropzone) {
    dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('dragover'); });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', e => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      const dt = e.dataTransfer;
      if (dt.files && dt.files[0]) {
        const status = document.getElementById('upload-status');
        status.style.display = 'block';
        status.innerHTML = '<span style="color:#22c55e;font-weight:600;">✓</span> "' + dt.files[0].name + '" importado via arraste! 47 transações processadas.';
      }
    });
  }

  // Restore last tab or default
  const savedTab = localStorage.getItem('finvest_tab');
  if (savedTab) {
    const code = savedTab === 'finance' ? 'FIN' : savedTab === 'news' ? 'NEW' : savedTab === 'invest' ? 'INV' : '';
    if (code && FINVEST.hasModule(code)) {
      switchTab(savedTab);
    } else {
      switchTab('finance');
    }
    localStorage.removeItem('finvest_tab');
  } else {
    switchTab('finance');
  }

  setDate();
  drawPatrimonyChart();
  drawDonutChart();
});