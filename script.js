const STORAGE_KEYS = {
  ACTIVE: 'zonaGymActiveMembers',
  PENDING: 'zonaGymPendingMembers',
  SALES: 'zonaGymSales'
};

const serviceCatalog = {
  maquinas: { label: 'Solo máquinas', regular: 50, promo2plus: 50 },
  bailes: { label: 'Solo bailes', regular: 50, promo2plus: 50 },
  maquina_baile: { label: 'Máquina + baile', regular: 60, promo2plus: 50 },
  baile_jumping: { label: 'Baile + jumping', regular: 60, promo2plus: 50 },
  '3servicios': { label: 'Los 3 servicios', regular: 70, promo2plus: 60 }
};

const goalText = { lose: 'Bajar de peso', maintain: 'Mantener peso', gain: 'Subir de peso' };
const macrosByGoal = {
  lose: { protein: 0.35, carbs: 0.35, fats: 0.3 },
  maintain: { protein: 0.3, carbs: 0.4, fats: 0.3 },
  gain: { protein: 0.25, carbs: 0.5, fats: 0.25 }
};

const foodByGoal = {
  lose: [
    { name: 'Pollo guisado + arroz', portion: '150g + 120g', protein: 41, carbs: 36, fats: 10 },
    { name: 'Tortilla + papa sancochada', portion: '2 huevos + 150g', protein: 14, carbs: 30, fats: 10 },
    { name: 'Pescado + camote', portion: '140g + 120g', protein: 30, carbs: 27, fats: 6 }
  ],
  maintain: [
    { name: 'Seco de pollo + frejol', portion: '150g + 120g', protein: 38, carbs: 30, fats: 12 },
    { name: 'Tarwi + queso', portion: '100g + 40g', protein: 22, carbs: 17, fats: 12 },
    { name: 'Atún + yuca', portion: '1 lata + 150g', protein: 28, carbs: 41, fats: 8 }
  ],
  gain: [
    { name: 'Tallarín rojo + pollo', portion: '240g + 150g', protein: 42, carbs: 68, fats: 16 },
    { name: 'Arroz + huevo + palta', portion: '200g + 2 und + 50g', protein: 19, carbs: 58, fats: 19 },
    { name: 'Frejol + arroz + huevo', portion: '150g + 130g + 1 und', protein: 24, carbs: 61, fats: 11 }
  ]
};

const routineByGoal = {
  lose: ['Lunes: Pierna + cardio', 'Martes: Espalda + abdomen', 'Miércoles: HIIT', 'Jueves: Pecho + tríceps', 'Viernes: Glúteo + posterior', 'Sábado: Full body ligero'],
  maintain: ['Lunes: Pecho + hombro', 'Martes: Pierna', 'Miércoles: Cardio + core', 'Jueves: Espalda + bíceps', 'Viernes: Pierna + glúteo', 'Sábado: Full body técnico'],
  gain: ['Lunes: Pecho pesado', 'Martes: Pierna fuerza', 'Miércoles: Espalda + bíceps', 'Jueves: Hombros + core', 'Viernes: Pierna hipertrofia', 'Sábado: Upper completo']
};

const byId = (id) => document.getElementById(id);
const getStored = (k) => JSON.parse(localStorage.getItem(k) || '[]');
const setStored = (k, v) => localStorage.setItem(k, JSON.stringify(v));

// Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const appSections = document.querySelectorAll('.app-section');
function activateSection(sectionId) {
  appSections.forEach((s) => s.classList.toggle('hidden', s.id !== sectionId));
  tabButtons.forEach((b) => b.classList.toggle('active', b.dataset.target === sectionId));
}

tabButtons.forEach((b) => b.addEventListener('click', () => activateSection(b.dataset.target)));

// -------- Plan nutricional --------
const gymForm = byId('gym-form');
const summary = byId('summary');
const macroBars = byId('macro-bars');
const projection = byId('projection');
const foods = byId('foods');
const routine = byId('routine');
const results = byId('results');

function calculateCalories({ sex, weight, height, age, activity, goal }) {
  const bmr = sex === 'male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
  const maintenance = bmr * activity;
  let target = maintenance;
  if (goal === 'lose') target -= 450;
  if (goal === 'gain') target += 350;
  return { maintenance: Math.round(maintenance), target: Math.round(target) };
}

function splitMacros(calories, goal) {
  const m = macrosByGoal[goal];
  return {
    protein: { g: Math.round((calories * m.protein) / 4), p: Math.round(m.protein * 100) },
    carbs: { g: Math.round((calories * m.carbs) / 4), p: Math.round(m.carbs * 100) },
    fats: { g: Math.round((calories * m.fats) / 9), p: Math.round(m.fats * 100) }
  };
}

gymForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    name: byId('name').value.trim(),
    age: Number(byId('age').value),
    sex: byId('sex').value,
    weight: Number(byId('weight').value),
    height: Number(byId('height').value),
    activity: Number(byId('activity').value),
    goal: byId('goal').value
  };
  if (!data.name) return;

  const c = calculateCalories(data);
  const m = splitMacros(c.target, data.goal);

  summary.innerHTML = `<h2>Plan para ${data.name}</h2><p class="muted">Objetivo: <strong>${goalText[data.goal]}</strong></p>
  <div class="stat-grid"><div class="stat"><span class="label">Mantenimiento</span><span class="value">${c.maintenance} kcal</span></div>
  <div class="stat"><span class="label">Objetivo</span><span class="value">${c.target} kcal</span></div></div>`;

  macroBars.innerHTML = '';
  ['protein', 'carbs', 'fats'].forEach((k) => {
    const row = document.createElement('div');
    row.className = 'macro-row';
    row.innerHTML = `<div class="macro-head"><span>${k}</span><span>${m[k].g} g · ${m[k].p}%</span></div><div class="track"><div class="fill ${k}" style="width:${m[k].p}%"></div></div>`;
    macroBars.appendChild(row);
  });

  projection.innerHTML = '<div class="projection-box">Plan orientativo. Ajustar con profesional.</div>';
  foods.innerHTML = foodByGoal[data.goal].map((f) => `<article class="food-item"><h4>${f.name}</h4><p class="muted">${f.portion}</p><ul><li>P: ${f.protein}g</li><li>C: ${f.carbs}g</li><li>G: ${f.fats}g</li></ul></article>`).join('');
  routine.innerHTML = routineByGoal[data.goal].map((r) => `<article class="day-card">${r}</article>`).join('');
  results.classList.remove('hidden');
});

// -------- Registro --------
const registerForm = byId('register-form');
const registerError = byId('register-error');
const summaryModal = byId('summary-modal');
const summaryContent = byId('summary-content');
const closeModalBtn = byId('close-modal-btn');

function getServicePrice(serviceKey, people) {
  const s = serviceCatalog[serviceKey];
  if (!s) return 0;
  return people === '2plus' ? s.promo2plus : s.regular;
}

function calculateEndDate(startISO) {
  if (!startISO) return '';
  const d = new Date(`${startISO}T00:00:00`);
  d.setMonth(d.getMonth() + 1);
  return d.toISOString().split('T')[0];
}

function refreshRegisterCalc() {
  const serviceKey = byId('serviceType').value;
  const people = byId('peopleCount').value;
  const price = getServicePrice(serviceKey, people);
  const paid = Number(byId('advancePaid').value || 0);

  byId('basePrice').value = price;
  byId('totalPay').value = price;
  byId('balance').value = Math.max(price - paid, 0).toFixed(2);
  byId('endDate').value = calculateEndDate(byId('startDate').value);
}

function validateRegister() {
  const errors = [];
  const name = byId('fullName').value.trim();
  const dni = byId('dni').value.trim();
  const serviceKey = byId('serviceType').value;
  const people = byId('peopleCount').value;
  const paid = Number(byId('advancePaid').value || 0);
  const total = getServicePrice(serviceKey, people);

  if (!name) errors.push('Nombre obligatorio.');
  if (!dni) errors.push('DNI obligatorio.');
  if (!byId('startDate').value) errors.push('Fecha de inscripción obligatoria.');
  if (!serviceKey) errors.push('Selecciona servicio.');
  if (Number.isNaN(paid) || paid < 0) errors.push('Adelanto inválido.');
  if (paid > total) errors.push('Adelanto no puede ser mayor al total.');

  return errors;
}

function showError(el, messages) {
  if (messages.length === 0) {
    el.classList.add('hidden');
    el.textContent = '';
  } else {
    el.classList.remove('hidden');
    el.textContent = messages.join(' ');
  }
}

function openModal() { summaryModal.classList.remove('hidden'); }
function closeModal() { summaryModal.classList.add('hidden'); }

function currentRegisterData() {
  const serviceKey = byId('serviceType').value;
  const people = byId('peopleCount').value;
  const total = getServicePrice(serviceKey, people);
  const paid = Number(byId('advancePaid').value || 0);
  const balance = Math.max(total - paid, 0);
  return {
    id: crypto.randomUUID(),
    fullName: byId('fullName').value.trim(),
    dni: byId('dni').value.trim(),
    serviceKey,
    service: serviceCatalog[serviceKey]?.label || '-',
    people,
    startDate: byId('startDate').value,
    endDate: byId('endDate').value,
    total,
    paid,
    balance
  };
}

function pushRegistration(record) {
  if (record.balance > 0) {
    const pending = getStored(STORAGE_KEYS.PENDING);
    pending.push(record);
    setStored(STORAGE_KEYS.PENDING, pending);
  } else {
    const active = getStored(STORAGE_KEYS.ACTIVE);
    active.push(record);
    setStored(STORAGE_KEYS.ACTIVE, active);
  }
}

function removeActive(id) {
  const active = getStored(STORAGE_KEYS.ACTIVE).filter((r) => r.id !== id);
  setStored(STORAGE_KEYS.ACTIVE, active);
  renderActiveTable();
  renderSearchResults();
  renderExpiryAlerts();
}

function renderActiveTable() {
  const body = byId('register-table-body');
  const active = getStored(STORAGE_KEYS.ACTIVE);
  body.innerHTML = '';
  if (active.length === 0) {
    body.innerHTML = '<tr><td colspan="8">Sin registros activos.</td></tr>';
    return;
  }

  active.forEach((r) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.fullName}</td><td>${r.dni}</td><td>${r.service}</td><td>${r.startDate}</td><td>${r.endDate}</td><td>S/ ${r.total.toFixed(2)}</td><td>S/ ${r.balance.toFixed(2)}</td><td><button class="mini-btn" data-delete-active="${r.id}" type="button">Borrar</button></td>`;
    body.appendChild(tr);
  });
}

function renderExpiryAlerts() {
  const el = byId('expiry-alerts');
  const active = getStored(STORAGE_KEYS.ACTIVE);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const alerts = active.filter((r) => {
    const end = new Date(`${r.endDate}T00:00:00`);
    const diff = Math.round((end - today) / 86400000);
    return diff >= 0 && diff <= 3;
  });

  if (alerts.length === 0) {
    el.textContent = 'Sin alertas por ahora.';
    return;
  }

  el.innerHTML = alerts.map((r) => `<div class="alert-item">⚠️ ${r.fullName} vence el ${r.endDate} (DNI: ${r.dni})</div>`).join('');
}

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const errors = validateRegister();
  showError(registerError, errors);
  if (errors.length) return;

  const record = currentRegisterData();
  pushRegistration(record);

  summaryContent.innerHTML = `<p><strong>Cliente:</strong> ${record.fullName}</p><p><strong>DNI:</strong> ${record.dni}</p><p><strong>Servicio:</strong> ${record.service}</p><p><strong>Total:</strong> S/ ${record.total.toFixed(2)}</p><p><strong>Pagado:</strong> S/ ${record.paid.toFixed(2)}</p><p><strong>Saldo:</strong> S/ ${record.balance.toFixed(2)}</p>`;
  openModal();

  registerForm.reset();
  byId('peopleCount').value = '1';
  byId('advancePaid').value = '0';
  refreshRegisterCalc();

  renderActiveTable();
  renderPendingTable();
  renderExpiryAlerts();
  renderSearchResults();
});

byId('preview-btn').addEventListener('click', () => {
  const errors = validateRegister();
  showError(registerError, errors);
  if (errors.length) return;
  const r = currentRegisterData();
  summaryContent.innerHTML = `<p><strong>Cliente:</strong> ${r.fullName}</p><p><strong>Total:</strong> S/ ${r.total.toFixed(2)}</p><p><strong>Saldo:</strong> S/ ${r.balance.toFixed(2)}</p>`;
  openModal();
});

['serviceType', 'peopleCount', 'startDate', 'advancePaid'].forEach((id) => byId(id).addEventListener('input', refreshRegisterCalc));
['serviceType', 'peopleCount', 'startDate'].forEach((id) => byId(id).addEventListener('change', refreshRegisterCalc));

closeModalBtn.addEventListener('click', closeModal);
summaryModal.addEventListener('click', (e) => { if (e.target === summaryModal) closeModal(); });

byId('register-table-body').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-delete-active]');
  if (!btn) return;
  removeActive(btn.dataset.deleteActive);
});

// -------- Pendientes --------
function renderPendingTable() {
  const body = byId('pending-table-body');
  const pending = getStored(STORAGE_KEYS.PENDING);
  body.innerHTML = '';
  if (pending.length === 0) {
    body.innerHTML = '<tr><td colspan="8">No hay pagos pendientes.</td></tr>';
    return;
  }

  pending.forEach((p) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.fullName}</td><td>${p.dni}</td><td>${p.service}</td>
      <td>S/ ${p.total.toFixed(2)}</td><td>S/ ${p.paid.toFixed(2)}</td><td>S/ ${p.balance.toFixed(2)}</td>
      <td><input type="number" min="0" step="0.01" value="0" class="pay-input" data-pay-id="${p.id}" /></td>
      <td>
        <button type="button" class="mini-btn" data-add-pay="${p.id}">Agregar pago</button>
        <button type="button" class="mini-btn danger" data-delete-pending="${p.id}">Borrar</button>
      </td>
    `;
    body.appendChild(tr);
  });
}

function addPaymentToPending(id, amount) {
  const pending = getStored(STORAGE_KEYS.PENDING);
  const idx = pending.findIndex((p) => p.id === id);
  if (idx === -1) return;

  const p = pending[idx];
  p.paid = Number((p.paid + amount).toFixed(2));
  p.balance = Number((p.total - p.paid).toFixed(2));

  if (p.balance <= 0) {
    p.balance = 0;
    pending.splice(idx, 1);
    setStored(STORAGE_KEYS.PENDING, pending);
    const active = getStored(STORAGE_KEYS.ACTIVE);
    active.push(p);
    setStored(STORAGE_KEYS.ACTIVE, active);
  } else {
    pending[idx] = p;
    setStored(STORAGE_KEYS.PENDING, pending);
  }

  renderPendingTable();
  renderActiveTable();
  renderExpiryAlerts();
  renderSearchResults();
}

function deletePending(id) {
  const pending = getStored(STORAGE_KEYS.PENDING).filter((p) => p.id !== id);
  setStored(STORAGE_KEYS.PENDING, pending);
  renderPendingTable();
  renderSearchResults();
}

byId('pending-table-body').addEventListener('click', (e) => {
  const addBtn = e.target.closest('[data-add-pay]');
  const delBtn = e.target.closest('[data-delete-pending]');

  if (addBtn) {
    const id = addBtn.dataset.addPay;
    const input = byId('pending-table-body').querySelector(`[data-pay-id="${id}"]`);
    const amount = Number(input?.value || 0);
    if (!Number.isFinite(amount) || amount <= 0) return;
    addPaymentToPending(id, amount);
  }

  if (delBtn) {
    deletePending(delBtn.dataset.deletePending);
  }
});

// -------- Ventas --------
const salesForm = byId('sales-form');
const salesError = byId('sales-error');

function calcSaleTotal() {
  const units = Number(byId('unitsSold').value || 0);
  const unit = Number(byId('unitPrice').value || 0);
  byId('finalPrice').value = (Math.max(units, 0) * Math.max(unit, 0)).toFixed(2);
}

function renderSales() {
  const body = byId('sales-table-body');
  const sales = getStored(STORAGE_KEYS.SALES);
  body.innerHTML = '';
  if (sales.length === 0) {
    body.innerHTML = '<tr><td colspan="4">Sin ventas aún.</td></tr>';
    return;
  }
  sales.forEach((s) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.product}</td><td>${s.units}</td><td>S/ ${s.unitPrice.toFixed(2)}</td><td>S/ ${s.final.toFixed(2)}</td>`;
    body.appendChild(tr);
  });
}

salesForm.addEventListener('submit', (e) => {
  e.preventDefault();
  calcSaleTotal();
  const product = byId('productName').value.trim();
  const units = Number(byId('unitsSold').value);
  const unitPrice = Number(byId('unitPrice').value);

  const errors = [];
  if (!product) errors.push('Producto obligatorio.');
  if (!Number.isFinite(units) || units <= 0) errors.push('Unidades inválidas.');
  if (!Number.isFinite(unitPrice) || unitPrice < 0) errors.push('Precio unitario inválido.');
  showError(salesError, errors);
  if (errors.length) return;

  const sales = getStored(STORAGE_KEYS.SALES);
  sales.push({ product, units, unitPrice, final: Number(byId('finalPrice').value) });
  setStored(STORAGE_KEYS.SALES, sales);
  renderSales();
  salesForm.reset();
  byId('finalPrice').value = '0.00';
});

byId('unitsSold').addEventListener('input', calcSaleTotal);
byId('unitPrice').addEventListener('input', calcSaleTotal);

// -------- Búsqueda --------
const searchInput = byId('searchInput');
const searchResults = byId('search-results');

function renderSearchResults() {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) {
    searchResults.textContent = 'Escribe un criterio para buscar.';
    return;
  }

  const active = getStored(STORAGE_KEYS.ACTIVE).map((r) => ({ ...r, status: 'Pagado completo' }));
  const pending = getStored(STORAGE_KEYS.PENDING).map((r) => ({ ...r, status: `Debe S/ ${r.balance.toFixed(2)}` }));
  const all = [...active, ...pending];

  const found = all.filter((r) => r.fullName.toLowerCase().includes(q) || r.dni.toLowerCase().includes(q));

  if (found.length === 0) {
    searchResults.textContent = 'No se encontraron usuarios.';
    return;
  }

  searchResults.innerHTML = found.map((r) => `<div class="alert-item"><strong>${r.fullName}</strong> · DNI: ${r.dni}<br/>Servicio: ${r.service} · Vence: ${r.endDate}<br/>Estado: ${r.status}</div>`).join('');
}

searchInput.addEventListener('input', renderSearchResults);

// Inicialización
refreshRegisterCalc();
calcSaleTotal();
renderActiveTable();
renderPendingTable();
renderSales();
renderExpiryAlerts();
