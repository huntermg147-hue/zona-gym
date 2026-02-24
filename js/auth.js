import { applyFinanceDashboard } from './finance.js';
import { renderTrainerView } from './trainer.js';
import { renderStudentView } from './student.js';

const AUTH_KEY = 'zonaGymAuthUser';

const mockUsers = [
  { username: 'dueno', password: '1234', role: 'dueño', membershipType: 'vip', fullName: 'Dueño del sistema' },
  { username: 'admin', password: '1234', role: 'administrador', membershipType: 'normal', fullName: 'Administrador' },
  { username: 'entrenador', password: '1234', role: 'entrenador', membershipType: 'normal', fullName: 'Entrenador' },
  { username: 'alumno', password: '1234', role: 'alumno', membershipType: 'normal', fullName: 'Alumno Demo' },
  { username: 'alumnovip', password: '1234', role: 'alumno', membershipType: 'vip', fullName: 'Alumno VIP Demo' }
];

const roleAccess = {
  'dueño': ['nutrition-section', 'register-section', 'sales-section', 'pending-section', 'search-section', 'staff-section', 'reports-section', 'closure-section', 'payments-filter-section', 'vip-config-section', 'trainer-section', 'student-section'],
  administrador: ['register-section', 'sales-section', 'pending-section', 'search-section', 'closure-section', 'payments-filter-section'],
  entrenador: ['nutrition-section', 'trainer-section', 'search-section'],
  alumno: ['student-section', 'nutrition-section']
};

export function getCurrentAuthUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
  } catch {
    return null;
  }
}

function setCurrentAuthUser(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  window.currentUserRole = user?.role || null;
}

function clearCurrentAuthUser() {
  localStorage.removeItem(AUTH_KEY);
  window.currentUserRole = null;
}

export function applyRoleUi(user) {
  const tabs = document.querySelectorAll('.tab-btn[data-target]');
  const sections = document.querySelectorAll('.app-section');
  const allowed = new Set(roleAccess[user.role] || []);

  tabs.forEach((btn) => {
    const target = btn.dataset.target;
    btn.classList.toggle('hidden', !allowed.has(target));
  });

  sections.forEach((sec) => {
    if (!allowed.has(sec.id)) sec.classList.add('hidden');
  });

  const badge = document.getElementById('current-role-badge');
  if (badge) badge.textContent = `ROL: ${user.role.toUpperCase()} · ${user.fullName}`;

  const staffForm = document.getElementById('staff-form');
  if (staffForm && user.role === 'administrador') {
    const fieldset = staffForm.querySelector('fieldset') || staffForm;
    fieldset.querySelectorAll('input,select,button').forEach((el) => { if (el.type !== 'button') el.disabled = true; });
  }

  const vipInputs = ['vip-auto-promo', 'vip-promo-rule'];
  vipInputs.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.disabled = user.role !== 'dueño';
  });

  applyFinanceDashboard(user.role);
  renderTrainerView(user);
  renderStudentView(user);

  const firstAllowed = [...allowed][0];
  const firstBtn = document.querySelector(`.tab-btn[data-target="${firstAllowed}"]`);
  firstBtn?.click();
}

export function initAuth() {
  const loginScreen = document.getElementById('login-screen');
  const appRoot = document.getElementById('app-root');
  const loginForm = document.getElementById('login-form');
  const userInput = document.getElementById('login-username');
  const passInput = document.getElementById('login-password');
  const errorEl = document.getElementById('login-error');
  const logoutBtn = document.getElementById('logout-btn');

  const openApp = (user) => {
    setCurrentAuthUser(user);
    loginScreen?.classList.add('hidden');
    appRoot?.classList.remove('hidden');
    applyRoleUi(user);
  };

  const current = getCurrentAuthUser();
  if (current) openApp(current);

  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = userInput?.value?.trim().toLowerCase();
    const password = passInput?.value || '';
    const user = mockUsers.find((u) => u.username === username && u.password === password);

    if (!user) {
      if (errorEl) {
        errorEl.textContent = 'Usuario o contraseña inválidos.';
        errorEl.classList.remove('hidden');
      }
      return;
    }
    errorEl?.classList.add('hidden');
    openApp(user);
  });

  logoutBtn?.addEventListener('click', () => {
    clearCurrentAuthUser();
    appRoot?.classList.add('hidden');
    loginScreen?.classList.remove('hidden');
  });
}
