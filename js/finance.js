import { STORAGE_KEYS, getStored } from './storage.js';

function sum(arr, cb) {
  return arr.reduce((acc, item) => acc + cb(item), 0);
}

export function getFinanceMetrics() {
  const today = new Date().toISOString().slice(0, 10);
  const month = today.slice(0, 7);
  const active = getStored(STORAGE_KEYS.ACTIVE);
  const pending = getStored(STORAGE_KEYS.PENDING);
  const sales = getStored(STORAGE_KEYS.SALES);

  const totalVentasMes = sum(sales.filter((s) => (s.date || '').slice(0, 7) === month), (s) => Number(s.final || 0));
  const pagosRegistroDia = sum([...active, ...pending], (r) => {
    const history = Array.isArray(r.paymentHistory) ? r.paymentHistory : [];
    return sum(history.filter((h) => h.date === today), (h) => Number(h.amount || 0));
  });
  const totalCajaDia = pagosRegistroDia + sum(sales.filter((s) => s.date === today), (s) => Number(s.final || 0));

  return {
    activos: active.length,
    pendientes: pending.length,
    totalVentasMes,
    totalCajaDia
  };
}

export function applyFinanceDashboard(role) {
  const box = document.getElementById('role-metrics');
  if (!box) return;
  if (role !== 'dueño') {
    box.innerHTML = '';
    return;
  }
  const m = getFinanceMetrics();
  box.innerHTML = `
    <div class="stat"><span class="label">Total activos</span><span class="value">${m.activos}</span></div>
    <div class="stat"><span class="label">Total pendientes</span><span class="value">${m.pendientes}</span></div>
    <div class="stat"><span class="label">Ventas del mes</span><span class="value">S/ ${m.totalVentasMes.toFixed(2)}</span></div>
    <div class="stat"><span class="label">Caja del día</span><span class="value">S/ ${m.totalCajaDia.toFixed(2)}</span></div>
  `;
}
