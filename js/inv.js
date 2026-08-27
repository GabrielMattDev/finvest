/* ===== INVESTMENTS MODULE ===== */
const investments = [
  { name: 'CDB Banco XYZ', rate: 1.24, type: 'cdi', cdi: 0.1075 },
  { name: 'Tesouro Selic 2029', rate: 1.10, type: 'selic', cdi: 0.1075 },
  { name: 'Fundo Multimercado Alfa', rate: 0.184, type: 'fixed' },
  { name: 'LCI Banco ABC', rate: 1.18, type: 'cdi', cdi: 0.1075 },
  { name: 'Tesouro IPCA+ 2035', rate: 0.0612, type: 'ipca', ipca: 0.045 }
];

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