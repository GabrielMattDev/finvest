/* ===== FINANCE MODULE ===== */
const patrimonyData = [98000, 102000, 105500, 108000, 112000, 115500, 118000, 121000, 125000, 130000, 138000, 142850];
const months = ['set', 'out', 'nov', 'dez', 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago'];

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

function handleFileUpload(input) {
  const status = document.getElementById('upload-status');
  if (input.files && input.files[0]) {
    const file = input.files[0];
    status.style.display = 'block';
    status.innerHTML = '<span style="color:#22c55e;font-weight:600;">✓</span> "' + file.name + '" carregado! 47 transações importadas, 8 categorias, saldo atualizado.';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  drawPatrimonyChart();
  drawDonutChart();

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
});