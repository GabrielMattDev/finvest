/* ===== FINVEST SHARED SIDEBAR ===== */
(function() {
  'use strict';

  const MODULE_ICONS = {
    FIN: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 3.08496C4.55224 3.08496 4.99993 3.53273 5 4.08496V18.0361H19.9941L20.0967 18.041C20.6008 18.0923 20.9941 18.5185 20.9941 19.0361C20.9941 19.5538 20.6008 19.9799 20.0967 20.0312L19.9941 20.0361H4.08496C3.53273 20.0361 3.08496 19.5884 3.08496 19.0361V4.08496C3.08496 3.53273 3.53273 3.08496 4.08496 3.08496H4ZM7.5 14.5C7.5 14.9142 7.16421 15.25 6.75 15.25C6.33579 15.25 6 14.9142 6 14.5V13.5C6 13.0858 6.33579 12.75 6.75 12.75C7.16421 12.75 7.5 13.0858 7.5 13.5V14.5ZM10.5 14.5C10.5 14.9142 10.1642 15.25 9.75 15.25C9.33579 15.25 9 14.9142 9 14.5V11.5C9 11.0858 9.33579 10.75 9.75 10.75C10.1642 10.75 10.5 11.0858 10.5 11.5V14.5ZM13.5 14.5C13.5 14.9142 13.1642 15.25 12.75 15.25C12.3358 15.25 12 14.9142 12 14.5V9.5C12 9.08579 12.3358 8.75 12.75 8.75C13.1642 8.75 13.5 9.08579 13.5 9.5V14.5ZM16.5 14.5C16.5 14.9142 16.1642 15.25 15.75 15.25C15.3358 15.25 15 14.9142 15 14.5V7.5C15 7.08579 15.3358 6.75 15.75 6.75C16.1642 6.75 16.5 7.08579 16.5 7.5V14.5Z"/></svg>',
    NEW: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4C4 3.44772 4.44772 3 5 3H19C19.5523 3 20 3.44772 20 4V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4Z"/><path d="M8 7H16"/><path d="M8 11H16"/><path d="M8 15H12"/></svg>',
    INV: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L12 22"/><path d="M12 2L18 8"/><path d="M12 2L6 8"/></svg>',
    ADM: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
  };

  const MODULE_PAGES = {
    FIN: 'fin.html',
    NEW: 'new.html',
    INV: 'inv.html',
    ADM: 'adm.html'
  };

  function initSidebar() {
    if (!FINVEST.guardRoute()) return;

    const session = FINVEST.getSession();
    if (!session) return;

    const avatar = document.getElementById('user-avatar');
    const nameEl = document.getElementById('user-name');
    const profileEl = document.getElementById('user-profile');

    if (avatar) avatar.textContent = session.name.charAt(0).toUpperCase();
    if (nameEl) nameEl.textContent = session.name;
    if (profileEl) profileEl.textContent = FINVEST.getProfileLabel();

    const badge = document.getElementById('profile-badge');
    if (badge) badge.textContent = FINVEST.getProfileLabel();

    const nav = document.getElementById('sidebar-nav');
    if (!nav) return;

    const modules = FINVEST.getAllowedModules();
    const currentPage = window.location.pathname.split('/').pop() || 'fin.html';

    let html = '';
    modules.forEach(mod => {
      const page = MODULE_PAGES[mod.code];
      const isActive = currentPage === page ? 'active' : '';
      const icon = MODULE_ICONS[mod.code] || '';
      html += `<a href="${page}" class="nav-item ${isActive}">${icon}${mod.name}</a>`;
    });

    nav.innerHTML = html;

    const dateEl = document.getElementById('current-date');
    if (dateEl) {
      dateEl.textContent = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
  } else {
    initSidebar();
  }
})();