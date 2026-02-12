const STORAGE_KEYS = {
  ACTIVE: 'zonaGymActiveMembers',
  PENDING: 'zonaGymPendingMembers',
  SALES: 'zonaGymSales',
  STAFF: 'zonaGymStaffMovements'
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
    {
      name: 'Pollo guisado + arroz + ensalada',
      portion: 'Pechuga 150g + arroz cocido 120g + ensalada 100g',
      protein: 41,
      carbs: 36,
      fats: 10,
      kcal: 390,
      cost: 'Económico',
      region: 'Costa / Sierra',
      when: 'Almuerzo',
      note: 'Usar poca sal y 1 cdita de aceite para cocinar.'
    },
    {
      name: 'Tortilla de verduras + papa sancochada',
      portion: '2 huevos + verduras 80g + papa 150g',
      protein: 14,
      carbs: 30,
      fats: 10,
      kcal: 275,
      cost: 'Económico',
      region: 'Nacional',
      when: 'Desayuno / Cena',
      note: 'Agregar cebolla, tomate y espinaca para más saciedad.'
    },
    {
      name: 'Pescado sudado + camote',
      portion: 'Pescado 140g + camote 120g + salsa criolla 50g',
      protein: 30,
      carbs: 27,
      fats: 6,
      kcal: 285,
      cost: 'Media-baja',
      region: 'Costa',
      when: 'Almuerzo',
      note: 'Preferir pescado fresco de temporada para reducir costo.'
    },
    {
      name: 'Ceviche de tarwi con choclo',
      portion: 'Tarwi cocido 130g + choclo 80g + limón y cebolla',
      protein: 23,
      carbs: 24,
      fats: 8,
      kcal: 255,
      cost: 'Económico',
      region: 'Sierra',
      when: 'Merienda',
      note: 'Buena opción vegetal alta en proteína.'
    }
  ],
  maintain: [
    {
      name: 'Seco de pollo + frejol + arroz',
      portion: 'Pollo 150g + frejol 120g + arroz 90g',
      protein: 38,
      carbs: 44,
      fats: 12,
      kcal: 450,
      cost: 'Media-baja',
      region: 'Costa norte',
      when: 'Almuerzo',
      note: 'Controlar porción de arroz para mantener peso.'
    },
    {
      name: 'Tarwi guisado + queso fresco + cancha',
      portion: 'Tarwi 100g + queso 40g + cancha 20g',
      protein: 22,
      carbs: 21,
      fats: 12,
      kcal: 300,
      cost: 'Económico',
      region: 'Sierra',
      when: 'Cena',
      note: 'Excelente alternativa de proteína accesible.'
    },
    {
      name: 'Atún con yuca y palta',
      portion: 'Atún 1 lata + yuca 150g + palta 40g',
      protein: 28,
      carbs: 41,
      fats: 8,
      kcal: 360,
      cost: 'Media-baja',
      region: 'Costa / Selva',
      when: 'Almuerzo o post entrenamiento',
      note: 'Si hay presupuesto, reemplazar atún por bonito fresco.'
    },
    {
      name: 'Lentejas estofadas + huevo',
      portion: 'Lentejas 160g + huevo 1 und + arroz 80g',
      protein: 20,
      carbs: 43,
      fats: 9,
      kcal: 345,
      cost: 'Económico',
      region: 'Nacional',
      when: 'Almuerzo',
      note: 'Comida rendidora ideal para provincias.'
    }
  ],
  gain: [
    {
      name: 'Tallarín rojo + pollo + queso',
      portion: 'Tallarín cocido 240g + pollo 150g + queso 20g',
      protein: 45,
      carbs: 70,
      fats: 17,
      kcal: 610,
      cost: 'Media-baja',
      region: 'Costa',
      when: 'Almuerzo post entrenamiento',
      note: 'Ideal para aumentar calorías con buena proteína.'
    },
    {
      name: 'Arroz + huevo + palta + plátano',
      portion: 'Arroz 200g + 2 huevos + palta 50g + plátano 1 und',
      protein: 21,
      carbs: 85,
      fats: 19,
      kcal: 625,
      cost: 'Económico',
      region: 'Nacional',
      when: 'Desayuno reforzado',
      note: 'Fácil de preparar y económico para volumen.'
    },
    {
      name: 'Frejol + arroz + huevo + camote',
      portion: 'Frejol 150g + arroz 130g + 1 huevo + camote 120g',
      protein: 25,
      carbs: 83,
      fats: 11,
      kcal: 545,
      cost: 'Económico',
      region: 'Nacional',
      when: 'Almuerzo / Cena',
      note: 'Plato rendidor para subir peso con presupuesto bajo.'
    },
    {
      name: 'Quinua con leche + maní',
      portion: 'Quinua cocida 180g + leche 250ml + maní 20g',
      protein: 22,
      carbs: 58,
      fats: 18,
      kcal: 495,
      cost: 'Media-baja',
      region: 'Sierra',
      when: 'Merienda nocturna',
      note: 'Aporta energía y micronutrientes para recuperación.'
    }
  ]
};

const routineByGoal = {
  lose: [
    { day: 'Lunes', focus: 'Pierna + cardio', exercises: ['Sentadilla 4x12', 'Prensa 4x15', 'Caminata inclinada 20 min'] },
    { day: 'Martes', focus: 'Espalda + abdomen', exercises: ['Jalón al pecho 4x12', 'Remo con mancuerna 3x12', 'Plancha 4x40s'] },
    { day: 'Miércoles', focus: 'HIIT', exercises: ['Bicicleta 30s/30s x 12', 'Burpees 3x12', 'Movilidad 10 min'] },
    { day: 'Jueves', focus: 'Pecho + tríceps', exercises: ['Press banca 4x10', 'Fondos asistidos 3x12', 'Extensión tríceps 3x15'] },
    { day: 'Viernes', focus: 'Glúteo + posterior', exercises: ['Peso muerto rumano 4x10', 'Hip thrust 4x12', 'Abductores 3x20'] },
    { day: 'Sábado', focus: 'Full body ligero', exercises: ['Circuito 5 estaciones x 3 vueltas', 'Cardio suave 15 min'] }
  ],
  maintain: [
    { day: 'Lunes', focus: 'Pecho + hombro', exercises: ['Press inclinado 4x10', 'Elevaciones laterales 4x15', 'Flexiones 3x12'] },
    { day: 'Martes', focus: 'Pierna', exercises: ['Sentadilla goblet 4x12', 'Zancadas 3x12', 'Gemelos 4x18'] },
    { day: 'Miércoles', focus: 'Cardio + core', exercises: ['Trote 25 min', 'Crunch polea 4x15', 'Plancha lateral 3x30s'] },
    { day: 'Jueves', focus: 'Espalda + bíceps', exercises: ['Remo barra 4x10', 'Jalón cerrado 3x12', 'Curl bíceps 3x12'] },
    { day: 'Viernes', focus: 'Pierna + glúteo', exercises: ['Hip thrust 4x10', 'Peso muerto 3x10', 'Sentadilla búlgara 3x12'] },
    { day: 'Sábado', focus: 'Full body técnico', exercises: ['Técnica de básicos 45 min', 'Cardio moderado 15 min'] }
  ],
  gain: [
    { day: 'Lunes', focus: 'Pecho pesado', exercises: ['Press banca 5x5', 'Press inclinado 4x8', 'Aperturas 3x12'] },
    { day: 'Martes', focus: 'Pierna fuerza', exercises: ['Sentadilla 5x5', 'Prensa 4x8', 'Peso muerto rumano 4x8'] },
    { day: 'Miércoles', focus: 'Espalda + bíceps', exercises: ['Dominadas asistidas 4x8', 'Remo T 4x10', 'Curl barra 4x10'] },
    { day: 'Jueves', focus: 'Hombros + core', exercises: ['Press militar 5x6', 'Elevaciones laterales 4x12', 'Rueda abdominal 4x10'] },
    { day: 'Viernes', focus: 'Pierna hipertrofia', exercises: ['Sentadilla frontal 4x10', 'Zancadas 4x12', 'Extensiones 3x15'] },
    { day: 'Sábado', focus: 'Upper completo', exercises: ['Circuito torso 5 ejercicios x 4 series', 'Movilidad + estiramiento 15 min'] }
  ]
};

function getWeightProjection(goal) {
  if (goal === 'lose') return { weekly: -0.45, monthly: -1.8 };
  if (goal === 'gain') return { weekly: 0.3, monthly: 1.2 };
  return { weekly: 0, monthly: 0 };
}

const byId = (id) => document.getElementById(id);
const getStored = (k) => {
  try {
    return JSON.parse(localStorage.getItem(k) || '[]');
  } catch {
    return [];
  }
};

const setStored = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const csvMessage = byId('csv-message');

function setCsvMessage(message, isError = false) {
  if (!csvMessage) return;
  csvMessage.textContent = message;
  csvMessage.classList.toggle('csv-error', isError);
}

function toCsvValue(value) {
  const str = String(value ?? '');
  return `"${str.replaceAll('"', '""')}"`;
}

function getCsvDelimiter() {
  return ';';
}

function normalizeNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function formatPayMethod(method) {
  return method === 'yape' ? 'Yape' : 'Efectivo';
}

function buildCsvRows() {
  const active = getStored(STORAGE_KEYS.ACTIVE).map((r) => ({ source: 'active', ...r }));
  const pending = getStored(STORAGE_KEYS.PENDING).map((r) => ({ source: 'pending', ...r }));
  const sales = getStored(STORAGE_KEYS.SALES).map((r) => ({ source: 'sales', ...r, saleMethod: r.method || 'cash', saleDate: r.date || '' }));
  const staff = getStored(STORAGE_KEYS.STAFF).map((r) => ({ source: 'staff', ...r, staffName: r.staffName, staffProduct: r.product, staffCash: r.cash, staffDate: r.date }));
  return [...active, ...pending, ...sales, ...staff];
}

function exportToCsv() {
  const rows = buildCsvRows();
  const headers = ['source', 'id', 'fullName', 'phone', 'serviceKey', 'service', 'people', 'startDate', 'endDate', 'total', 'paid', 'balance', 'paymentMethod', 'paymentHistory', 'product', 'units', 'unitPrice', 'final', 'saleMethod', 'saleDate', 'staffName', 'staffProduct', 'staffCash', 'staffDate'];
  const delimiter = getCsvDelimiter();
  const lines = [headers.join(delimiter)];

  rows.forEach((row) => {
    const line = headers.map((header) => toCsvValue(row[header] ?? '')).join(delimiter);
    lines.push(line);
  });

  const blob = new Blob([`\ufeff${lines.join('\n')}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `zona-gym-backup-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);

  setCsvMessage(`Exportación completada: ${rows.length} registros.`);
}

function parseCsvLine(line, delimiter = ',') {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === delimiter && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  values.push(current);
  return values;
}

function importFromCsvText(csvText) {
  const cleaned = csvText.replace(/^﻿/, '').trim();
  if (!cleaned) throw new Error('El archivo CSV está vacío.');

  const lines = cleaned.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) throw new Error('El CSV no contiene filas para importar.');

  const delimiter = lines[0].includes(';') ? ';' : ',';
  const headers = parseCsvLine(lines[0], delimiter).map((h) => h.trim());
  const required = ['source'];
  if (!required.every((h) => headers.includes(h))) {
    throw new Error('CSV inválido: falta la columna source.');
  }

  const active = [];
  const pending = [];
  const sales = [];
  const staff = [];

  for (let i = 1; i < lines.length; i += 1) {
    const values = parseCsvLine(lines[i], delimiter);
    const row = Object.fromEntries(headers.map((h, idx) => [h, values[idx] ?? '']));

    if (row.source === 'staff') {
      if (!row.staffName) continue;
      staff.push({
        id: row.id || generateId(),
        staffName: row.staffName,
        product: row.staffProduct || '',
        cash: normalizeNumber(row.staffCash),
        date: row.staffDate || ''
      });
      continue;
    }

    if (row.source === 'sales') {
      if (!row.product) continue;
      sales.push({
        product: row.product,
        units: normalizeNumber(row.units),
        unitPrice: normalizeNumber(row.unitPrice),
        final: normalizeNumber(row.final),
        method: row.saleMethod || 'cash',
        date: row.saleDate || ''
      });
      continue;
    }

    if (!row.fullName || !(row.phone || row.dni)) continue;
    const record = {
      id: row.id || generateId(),
      fullName: row.fullName,
      phone: row.phone || row.dni || '',
      serviceKey: row.serviceKey || '',
      service: row.service || '-',
      people: row.people || '1',
      startDate: row.startDate || '',
      endDate: row.endDate || '',
      total: normalizeNumber(row.total),
      paid: normalizeNumber(row.paid),
      balance: normalizeNumber(row.balance),
      paymentMethod: row.paymentMethod || 'cash',
      paymentHistory: (() => {
        try {
          return JSON.parse(row.paymentHistory || '[]');
        } catch {
          return [];
        }
      })()
    };

    if (row.source === 'pending') pending.push(record);
    else active.push(record);
  }

  setStored(STORAGE_KEYS.ACTIVE, active);
  setStored(STORAGE_KEYS.PENDING, pending);
  setStored(STORAGE_KEYS.SALES, sales);
  setStored(STORAGE_KEYS.STAFF, staff);

  renderActiveTable();
  renderPendingTable();
  renderSales();
  renderExpiryAlerts();
  renderSearchResults();
  renderStaffTable();
  renderStaffByWorker();

  setCsvMessage(`Importación completada: activos ${active.length}, pendientes ${pending.length}, ventas ${sales.length}, personal ${staff.length}.`);
  renderClosure();
}

function setupCsvTools() {
  const exportBtn = byId('export-csv-btn');
  const importBtn = byId('import-csv-btn');
  const fileInput = byId('csv-file-input');

  if (!exportBtn || !importBtn || !fileInput) return;

  exportBtn.addEventListener('click', exportToCsv);
  importBtn.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', () => {
    const file = fileInput.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        importFromCsvText(String(reader.result || ''));
      } catch (error) {
        setCsvMessage(error.message || 'No se pudo importar el archivo.', true);
      } finally {
        fileInput.value = '';
      }
    };
    reader.onerror = () => {
      setCsvMessage('No se pudo leer el archivo CSV.', true);
      fileInput.value = '';
    };
    reader.readAsText(file);
  });
}


function generateId() {

  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
}


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

  const projectionData = getWeightProjection(data.goal);
  projection.innerHTML = `<div class="projection-box"><strong>Proyección semanal:</strong> ${projectionData.weekly > 0 ? '+' : ''}${projectionData.weekly.toFixed(2)} kg/semana</div>
  <div class="projection-box"><strong>Proyección mensual:</strong> ${projectionData.monthly > 0 ? '+' : ''}${projectionData.monthly.toFixed(2)} kg/mes</div>
  <div class="projection-box">Plan orientativo para público peruano. Ajustar con nutricionista si hay condición médica.</div>`;
  foods.innerHTML = foodByGoal[data.goal].map((f) => `<article class="food-item"><h4>${f.name}</h4><p class="muted">${f.portion}</p><ul><li>Proteína: ${f.protein}g</li><li>Carbohidratos: ${f.carbs}g</li><li>Grasas: ${f.fats}g</li><li>Energía aprox: ${f.kcal} kcal</li></ul><p class="muted">Momento sugerido: ${f.when}</p><p class="food-note">${f.note}</p><div class="food-meta"><span class="pill">Costo: ${f.cost}</span><span class="pill">Zona: ${f.region}</span></div></article>`).join('');
  routine.innerHTML = routineByGoal[data.goal].map((r) => `<article class="day-card"><h4>${r.day}: ${r.focus}</h4><ul>${r.exercises.map((exercise) => `<li>${exercise}</li>`).join('')}</ul></article>`).join('');
  results.classList.remove('hidden');
});

// -------- Registro --------
const registerForm = byId('register-form');
const registerError = byId('register-error');
function getServicePrice(serviceKey, people) {
  const s = serviceCatalog[serviceKey];
  if (!s) return 0;
  return people === '2plus' ? s.promo2plus : s.regular;
}

function getEffectiveRegisterTotal(defaultPrice) {
  const custom = Number(byId('customPrice').value || 0);
  if (Number.isFinite(custom) && custom > 0) return custom;
  return defaultPrice;
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
  const total = getEffectiveRegisterTotal(price);
  const paid = Number(byId('advancePaid').value || 0);

  byId('basePrice').value = price;
  byId('totalPay').value = total.toFixed(2);
  byId('balance').value = Math.max(total - paid, 0).toFixed(2);
  byId('endDate').value = calculateEndDate(byId('startDate').value);
}

function validateRegister() {
  const errors = [];
  const name = byId('fullName').value.trim();
  const phone = byId('phone').value.trim();
  const serviceKey = byId('serviceType').value;
  const people = byId('peopleCount').value;
  const paid = Number(byId('advancePaid').value || 0);
  const baseTotal = getServicePrice(serviceKey, people);
  const customPrice = Number(byId('customPrice').value || 0);
  const total = getEffectiveRegisterTotal(baseTotal);

  if (!name) errors.push('Nombre obligatorio.');
  if (!phone) errors.push('Celular obligatorio.');
  if (!byId('startDate').value) errors.push('Fecha de inscripción obligatoria.');
  if (!serviceKey) errors.push('Selecciona servicio.');
  if (Number.isNaN(paid) || paid < 0) errors.push('Adelanto inválido.');
  if (Number.isFinite(customPrice) && customPrice < 0) errors.push('Precio acordado inválido.');
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

function currentRegisterData() {
  const serviceKey = byId('serviceType').value;
  const people = byId('peopleCount').value;
  const baseTotal = getServicePrice(serviceKey, people);
  const total = getEffectiveRegisterTotal(baseTotal);
  const paid = Number(byId('advancePaid').value || 0);
  const balance = Math.max(total - paid, 0);
  return {
    id: generateId(),
    fullName: byId('fullName').value.trim(),
    phone: byId('phone').value.trim(),
    serviceKey,
    service: serviceCatalog[serviceKey]?.label || '-',
    people,
    startDate: byId('startDate').value,
    endDate: byId('endDate').value,
    baseTotal,
    total,
    paid,
    balance,
    paymentMethod: byId('registerPayMethod').value,
    paymentHistory: paid > 0 ? [{ amount: paid, method: byId('registerPayMethod').value, date: byId('startDate').value }] : []
  };
}

function pushRegistration(record) {
  const hasPartialAdvance = record.paid > 0 && record.balance > 0;

  if (hasPartialAdvance) {
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
  renderReports();
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
    tr.innerHTML = `<td>${r.fullName}</td><td>${r.phone || r.dni || '-'}</td><td>${r.service}</td><td>${r.startDate}</td><td>${r.endDate}</td><td>S/ ${r.total.toFixed(2)}</td><td>S/ ${r.balance.toFixed(2)}</td><td><button class="mini-btn" data-delete-active="${r.id}" type="button">Borrar</button></td>`;
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

  el.innerHTML = alerts.map((r) => `<div class="alert-item">⚠️ ${r.fullName} vence el ${r.endDate} (Cel: ${r.phone || r.dni || '-'})</div>`).join('');
}

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const errors = validateRegister();
  showError(registerError, errors);
  if (errors.length) return;

  const record = currentRegisterData();
  pushRegistration(record);


  registerForm.reset();
  byId('peopleCount').value = '1';
  byId('advancePaid').value = '0';
  byId('customPrice').value = '';
  byId('registerPayMethod').value = 'cash';
  refreshRegisterCalc();

  renderActiveTable();
  renderPendingTable();
  renderExpiryAlerts();
  renderSearchResults();
  renderClosure();
});

['serviceType', 'peopleCount', 'startDate', 'advancePaid', 'customPrice'].forEach((id) => byId(id).addEventListener('input', refreshRegisterCalc));
['serviceType', 'peopleCount', 'startDate'].forEach((id) => byId(id).addEventListener('change', refreshRegisterCalc));

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
      <td>${p.fullName}</td><td>${p.phone || p.dni || '-'}</td><td>${p.service}</td>
      <td>S/ ${p.total.toFixed(2)}</td><td>S/ ${p.paid.toFixed(2)}</td><td>S/ ${p.balance.toFixed(2)}</td>
      <td><input type="number" min="0" step="0.01" value="0" class="pay-input" data-pay-id="${p.id}" /><select class="pay-method" data-pay-method="${p.id}"><option value="cash">Efectivo</option><option value="yape">Yape</option></select></td>
      <td>
        <button type="button" class="mini-btn" data-add-pay="${p.id}">Agregar pago</button>
        <button type="button" class="mini-btn danger" data-delete-pending="${p.id}">Borrar</button>
      </td>
    `;
    body.appendChild(tr);
  });
}

function addPaymentToPending(id, amount, method) {
  const pending = getStored(STORAGE_KEYS.PENDING);
  const idx = pending.findIndex((p) => p.id === id);
  if (idx === -1) return;

  const p = pending[idx];
  p.paid = Number((p.paid + amount).toFixed(2));
  p.balance = Number((p.total - p.paid).toFixed(2));
  if (!Array.isArray(p.paymentHistory)) p.paymentHistory = [];
  p.paymentHistory.push({ amount, method, date: new Date().toISOString().slice(0, 10) });

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
  renderClosure();
}

function deletePending(id) {
  const pending = getStored(STORAGE_KEYS.PENDING).filter((p) => p.id !== id);
  setStored(STORAGE_KEYS.PENDING, pending);
  renderPendingTable();
  renderSearchResults();
  renderReports();
}

byId('pending-table-body').addEventListener('click', (e) => {
  const addBtn = e.target.closest('[data-add-pay]');
  const delBtn = e.target.closest('[data-delete-pending]');

  if (addBtn) {
    const id = addBtn.dataset.addPay;
    const input = byId('pending-table-body').querySelector(`[data-pay-id="${id}"]`);
    const amount = Number(input?.value || 0);
    if (!Number.isFinite(amount) || amount <= 0) return;
    const methodSelect = byId('pending-table-body').querySelector(`[data-pay-method="${id}"]`);
    const method = methodSelect?.value || 'cash';
    addPaymentToPending(id, amount, method);
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
    body.innerHTML = '<tr><td colspan="7">Sin ventas aún.</td></tr>';
    return;
  }
  sales.forEach((s, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.product}</td><td>${s.units}</td><td>S/ ${s.unitPrice.toFixed(2)}</td><td>S/ ${s.final.toFixed(2)}</td><td>${formatPayMethod(s.method || 'cash')}</td><td>${s.date || '-'}</td><td><button type="button" class="mini-btn danger" data-delete-sale-index="${index}">Borrar</button></td>`;
    body.appendChild(tr);
  });
}

salesForm.addEventListener('submit', (e) => {
  e.preventDefault();
  calcSaleTotal();
  const product = byId('productName').value.trim();
  const units = Number(byId('unitsSold').value);
  const unitPrice = Number(byId('unitPrice').value);
  const method = byId('salesPayMethod').value;
  const date = byId('saleDate').value;

  const errors = [];
  if (!product) errors.push('Producto obligatorio.');
  if (!Number.isFinite(units) || units <= 0) errors.push('Unidades inválidas.');
  if (!Number.isFinite(unitPrice) || unitPrice < 0) errors.push('Precio unitario inválido.');
  if (!date) errors.push('Fecha de venta obligatoria.');
  showError(salesError, errors);
  if (errors.length) return;

  const sales = getStored(STORAGE_KEYS.SALES);
  sales.push({ id: generateId(), product, units, unitPrice, final: Number(byId('finalPrice').value), method, date });
  setStored(STORAGE_KEYS.SALES, sales);
  renderSales();
  salesForm.reset();
  byId('finalPrice').value = '0.00';
  byId('salesPayMethod').value = 'cash';
  byId('saleDate').value = new Date().toISOString().slice(0, 10);
  renderClosure();
});

byId('unitsSold').addEventListener('input', calcSaleTotal);
byId('unitPrice').addEventListener('input', calcSaleTotal);

byId('sales-table-body').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-delete-sale-index]');
  if (!btn) return;
    const sales = getStored(STORAGE_KEYS.SALES);
  const idx = Number(btn.dataset.deleteSaleIndex);
  if (!Number.isInteger(idx) || idx < 0 || idx >= sales.length) return;
  sales.splice(idx, 1);
  setStored(STORAGE_KEYS.SALES, sales);
  renderSales();
  renderClosure();
});

// -------- Personal gym --------
const staffForm = byId('staff-form');
const staffError = byId('staff-error');

function renderStaffTable() {
  const body = byId('staff-table-body');
  const movements = getStored(STORAGE_KEYS.STAFF);
  body.innerHTML = '';
  if (movements.length === 0) {
    body.innerHTML = '<tr><td colspan="5">Sin movimientos aún.</td></tr>';
    return;
  }

  movements.forEach((m) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${m.staffName}</td><td>${m.product}</td><td>S/ ${Number(m.cash).toFixed(2)}</td><td>${m.date}</td><td><button type="button" class="mini-btn danger" data-delete-staff="${m.id}">Borrar</button></td>`;
    body.appendChild(tr);
  });
}

function deleteStaffMovement(id) {
  const staff = getStored(STORAGE_KEYS.STAFF).filter((m) => m.id !== id);
  setStored(STORAGE_KEYS.STAFF, staff);
  renderStaffTable();
  renderStaffByWorker();
  renderReports();
}

function renderStaffByWorker() {
  const container = byId('staff-by-worker');
  const movements = getStored(STORAGE_KEYS.STAFF);
  if (movements.length === 0) {
    container.textContent = 'Sin movimientos registrados.';
    return;
  }

  const grouped = movements.reduce((acc, item) => {
    if (!acc[item.staffName]) acc[item.staffName] = [];
    acc[item.staffName].push(item);
    return acc;
  }, {});

  container.innerHTML = Object.entries(grouped).map(([name, items]) => {
    const total = items.reduce((sum, it) => sum + Number(it.cash || 0), 0);
    const list = items.map((it) => `<li>${it.date}: ${it.product} · S/ ${Number(it.cash).toFixed(2)}</li>`).join('');
    return `<article class="worker-card"><h4>${name}</h4><p class="muted">Movimientos: ${items.length} · Total: S/ ${total.toFixed(2)}</p><ul>${list}</ul></article>`;
  }).join('');
}

byId('staff-table-body')?.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-delete-staff]');
  if (!btn) return;
  deleteStaffMovement(btn.dataset.deleteStaff);
});

staffForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const staffName = byId('staffName').value.trim();
  const product = byId('staffProduct').value.trim();
  const cash = Number(byId('staffCash').value || 0);
  const date = byId('staffDate').value;

  const errors = [];
  if (!staffName) errors.push('Nombre del personal obligatorio.');
  if (!product) errors.push('Producto obligatorio.');
  if (!Number.isFinite(cash) || cash < 0) errors.push('Efectivo inválido.');
  if (!date) errors.push('Fecha obligatoria.');
  showError(staffError, errors);
  if (errors.length) return;

  const staff = getStored(STORAGE_KEYS.STAFF);
  staff.push({ id: generateId(), staffName, product, cash, date });
  setStored(STORAGE_KEYS.STAFF, staff);

  staffForm.reset();
  renderStaffTable();
  renderStaffByWorker();
  renderReports();
});

// -------- Cierre de caja --------
function sumByMethod(items) {
  return items.reduce((acc, item) => {
    const method = item.method === 'yape' ? 'yape' : 'cash';
    acc.total += item.amount;
    acc[method] += item.amount;
    return acc;
  }, { total: 0, cash: 0, yape: 0 });
}

function renderClosureBox(el, title, dayItems, monthItems) {
  const day = sumByMethod(dayItems);
  const month = sumByMethod(monthItems);
  el.innerHTML = `
    <div class="stat"><span class="label">Por día</span><span class="value">S/ ${day.total.toFixed(2)}</span></div>
    <div class="stat"><span class="label">Por mes</span><span class="value">S/ ${month.total.toFixed(2)}</span></div>
    <div class="stat"><span class="label">Efectivo</span><span class="value">S/ ${month.cash.toFixed(2)}</span></div>
    <div class="stat"><span class="label">Yape</span><span class="value">S/ ${month.yape.toFixed(2)}</span></div>
  `;
}

function collectMembershipPayments(serviceKeyFilter) {
  const records = [...getStored(STORAGE_KEYS.ACTIVE), ...getStored(STORAGE_KEYS.PENDING)];
  const list = [];
  records.filter((r) => serviceKeyFilter.includes(r.serviceKey)).forEach((record) => {
    const history = Array.isArray(record.paymentHistory) && record.paymentHistory.length
      ? record.paymentHistory
      : (Number(record.paid) > 0 ? [{ amount: Number(record.paid), method: record.paymentMethod || 'cash', date: record.startDate }] : []);
    history.forEach((h) => list.push({ amount: Number(h.amount || 0), method: h.method || 'cash', date: h.date || record.startDate }));
  });
  return list;
}

function filterByDay(items, isoDate) {
  return items.filter((i) => i.date === isoDate);
}

function filterByMonth(items, yearMonth) {
  return items.filter((i) => (i.date || '').slice(0, 7) === yearMonth);
}

function renderClosure() {
  const today = new Date().toISOString().slice(0, 10);
  const yearMonth = today.slice(0, 7);

  const maquinasPayments = collectMembershipPayments(['maquinas']);
  const baileJumpingPayments = collectMembershipPayments(['baile_jumping']);
  const salesPayments = getStored(STORAGE_KEYS.SALES).map((s) => ({ amount: Number(s.final || 0), method: s.method || 'cash', date: s.date || '' }));

  renderClosureBox(byId('closure-maquinas'), 'Máquinas', filterByDay(maquinasPayments, today), filterByMonth(maquinasPayments, yearMonth));
  renderClosureBox(byId('closure-baile-jumping'), 'Baile y jumping', filterByDay(baileJumpingPayments, today), filterByMonth(baileJumpingPayments, yearMonth));
  renderClosureBox(byId('closure-ventas'), 'Ventas', filterByDay(salesPayments, today), filterByMonth(salesPayments, yearMonth));
  renderReports();
}

byId('refresh-closure-btn')?.addEventListener('click', renderClosure);

// -------- Reportes --------
function getCurrentYearMonth() {
  return new Date().toISOString().slice(0, 7);
}

function serviceMonthlyReport() {
  const yearMonth = getCurrentYearMonth();
  const records = [...getStored(STORAGE_KEYS.ACTIVE), ...getStored(STORAGE_KEYS.PENDING)]
    .filter((r) => (r.startDate || '').slice(0, 7) === yearMonth);

  const grouped = records.reduce((acc, r) => {
    const key = r.serviceKey || 'otro';
    if (!acc[key]) acc[key] = { label: r.service || key, count: 0, total: 0 };
    acc[key].count += 1;
    acc[key].total += Number(r.total || 0);
    return acc;
  }, {});

  return Object.values(grouped).sort((a, b) => b.total - a.total);
}

function pendingMonthlyReport() {
  const yearMonth = getCurrentYearMonth();
  const pending = getStored(STORAGE_KEYS.PENDING)
    .filter((r) => (r.startDate || '').slice(0, 7) === yearMonth);
  const debt = pending.reduce((sum, p) => sum + Number(p.balance || 0), 0);
  return { pending, debt };
}

function topProductsReport() {
  const yearMonth = getCurrentYearMonth();
  const sales = getStored(STORAGE_KEYS.SALES)
    .filter((s) => (s.date || '').slice(0, 7) === yearMonth);

  const grouped = sales.reduce((acc, s) => {
    const key = s.product || 'Sin nombre';
    if (!acc[key]) acc[key] = { name: key, units: 0, total: 0 };
    acc[key].units += Number(s.units || 0);
    acc[key].total += Number(s.final || 0);
    return acc;
  }, {});

  const list = Object.values(grouped);
  const byUnits = [...list].sort((a, b) => b.units - a.units)[0] || null;
  const byRevenue = [...list].sort((a, b) => b.total - a.total)[0] || null;
  return { byUnits, byRevenue };
}

function staffMonthlyReport() {
  const yearMonth = getCurrentYearMonth();
  const staff = getStored(STORAGE_KEYS.STAFF)
    .filter((s) => (s.date || '').slice(0, 7) === yearMonth);

  const grouped = staff.reduce((acc, s) => {
    const key = s.staffName || 'Sin nombre';
    if (!acc[key]) acc[key] = { name: key, moves: 0, total: 0 };
    acc[key].moves += 1;
    acc[key].total += Number(s.cash || 0);
    return acc;
  }, {});

  return Object.values(grouped).sort((a, b) => b.total - a.total);
}

function cashConsolidatedMonthlyReport() {
  const yearMonth = getCurrentYearMonth();
  const maquinas = filterByMonth(collectMembershipPayments(['maquinas']), yearMonth);
  const baileJumping = filterByMonth(collectMembershipPayments(['baile_jumping']), yearMonth);
  const ventas = filterByMonth(
    getStored(STORAGE_KEYS.SALES).map((s) => ({ amount: Number(s.final || 0), method: s.method || 'cash', date: s.date || '' })),
    yearMonth
  );

  return {
    maquinas: sumByMethod(maquinas),
    baileJumping: sumByMethod(baileJumping),
    ventas: sumByMethod(ventas)
  };
}

function renderReports() {
  const serviceBody = byId('report-service-body');
  const pendingTotal = byId('report-pending-total');
  const pendingList = byId('report-pending-list');
  const topProducts = byId('report-top-products');
  const staffSummary = byId('report-staff-summary');
  const cashSummary = byId('report-cash-summary');

  if (!serviceBody || !pendingTotal || !pendingList || !topProducts || !staffSummary || !cashSummary) return;

  const serviceReport = serviceMonthlyReport();
  serviceBody.innerHTML = serviceReport.length
    ? serviceReport.map((s) => `<tr><td>${s.label}</td><td>${s.count}</td><td>S/ ${s.total.toFixed(2)}</td></tr>`).join('')
    : '<tr><td colspan="3">Sin inscripciones este mes.</td></tr>';

  const pendingReport = pendingMonthlyReport();
  pendingTotal.textContent = `Deuda acumulada del mes: S/ ${pendingReport.debt.toFixed(2)}.`;
  pendingList.innerHTML = pendingReport.pending.length
    ? pendingReport.pending.map((p) => `<div class="alert-item"><strong>${p.fullName}</strong> · Cel: ${p.phone || p.dni || '-'} · Saldo: S/ ${Number(p.balance || 0).toFixed(2)}</div>`).join('')
    : 'Sin deudas pendientes.';

  const top = topProductsReport();
  topProducts.innerHTML = top.byUnits || top.byRevenue
    ? `
      <div class="alert-item"><strong>Más vendido (unidades):</strong> ${top.byUnits ? `${top.byUnits.name} (${top.byUnits.units} und)` : 'Sin datos'}</div>
      <div class="alert-item"><strong>Más rentable (monto):</strong> ${top.byRevenue ? `${top.byRevenue.name} (S/ ${top.byRevenue.total.toFixed(2)})` : 'Sin datos'}</div>
    `
    : 'Sin ventas registradas.';

  const staff = staffMonthlyReport();
  staffSummary.innerHTML = staff.length
    ? staff.map((s) => `<div class="alert-item"><strong>${s.name}</strong> · Movimientos: ${s.moves} · Total: S/ ${s.total.toFixed(2)}</div>`).join('')
    : 'Sin movimientos del personal.';

  const cash = cashConsolidatedMonthlyReport();
  cashSummary.innerHTML = `
    <div class="alert-item"><strong>Máquinas:</strong> Total S/ ${cash.maquinas.total.toFixed(2)} · Efectivo S/ ${cash.maquinas.cash.toFixed(2)} · Yape S/ ${cash.maquinas.yape.toFixed(2)}</div>
    <div class="alert-item"><strong>Baile + jumping:</strong> Total S/ ${cash.baileJumping.total.toFixed(2)} · Efectivo S/ ${cash.baileJumping.cash.toFixed(2)} · Yape S/ ${cash.baileJumping.yape.toFixed(2)}</div>
    <div class="alert-item"><strong>Ventas:</strong> Total S/ ${cash.ventas.total.toFixed(2)} · Efectivo S/ ${cash.ventas.cash.toFixed(2)} · Yape S/ ${cash.ventas.yape.toFixed(2)}</div>
  `;
}

function exportReportsCsv() {
  const ym = getCurrentYearMonth();
  const delimiter = getCsvDelimiter();
  const lines = [['categoria', 'detalle', 'valor'].join(delimiter)];

  serviceMonthlyReport().forEach((s) => {
    lines.push(['servicio', `${s.label} registros`, `${s.count}`].join(delimiter));
    lines.push(['servicio', `${s.label} total`, `S/ ${s.total.toFixed(2)}`].join(delimiter));
  });

  const pending = pendingMonthlyReport();
  lines.push(['pendientes', 'deuda acumulada', `S/ ${pending.debt.toFixed(2)}`].join(delimiter));
  pending.pending.forEach((p) => lines.push(['pendientes', `${p.fullName} saldo`, `S/ ${Number(p.balance || 0).toFixed(2)}`].join(delimiter)));

  const top = topProductsReport();
  if (top.byUnits) lines.push(['ventas', 'top unidades', `${top.byUnits.name} (${top.byUnits.units})`].join(delimiter));
  if (top.byRevenue) lines.push(['ventas', 'top monto', `${top.byRevenue.name} (S/ ${top.byRevenue.total.toFixed(2)})`].join(delimiter));

  staffMonthlyReport().forEach((s) => lines.push(['personal', `${s.name}`, `mov:${s.moves} total:S/ ${s.total.toFixed(2)}`].join(delimiter)));

  const cash = cashConsolidatedMonthlyReport();
  lines.push(['caja', 'maquinas total', `S/ ${cash.maquinas.total.toFixed(2)}`].join(delimiter));
  lines.push(['caja', 'maquinas efectivo', `S/ ${cash.maquinas.cash.toFixed(2)}`].join(delimiter));
  lines.push(['caja', 'maquinas yape', `S/ ${cash.maquinas.yape.toFixed(2)}`].join(delimiter));
  lines.push(['caja', 'baile+jumping total', `S/ ${cash.baileJumping.total.toFixed(2)}`].join(delimiter));
  lines.push(['caja', 'baile+jumping efectivo', `S/ ${cash.baileJumping.cash.toFixed(2)}`].join(delimiter));
  lines.push(['caja', 'baile+jumping yape', `S/ ${cash.baileJumping.yape.toFixed(2)}`].join(delimiter));
  lines.push(['caja', 'ventas total', `S/ ${cash.ventas.total.toFixed(2)}`].join(delimiter));
  lines.push(['caja', 'ventas efectivo', `S/ ${cash.ventas.cash.toFixed(2)}`].join(delimiter));
  lines.push(['caja', 'ventas yape', `S/ ${cash.ventas.yape.toFixed(2)}`].join(delimiter));

  const blob = new Blob([`\ufeff${lines.join('\n')}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `zona-gym-reportes-${ym}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

byId('export-reports-btn')?.addEventListener('click', exportReportsCsv);

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

  const found = all.filter((r) => r.fullName.toLowerCase().includes(q) || (r.phone || r.dni || '').toLowerCase().includes(q));

  if (found.length === 0) {
    searchResults.textContent = 'No se encontraron usuarios.';
    return;
  }

  searchResults.innerHTML = found.map((r) => `<div class="alert-item"><strong>${r.fullName}</strong> · Cel: ${r.phone || r.dni || '-'}<br/>Servicio: ${r.service} · Vence: ${r.endDate}<br/>Estado: ${r.status}</div>`).join('');
}

searchInput.addEventListener('input', renderSearchResults);

// Inicialización
refreshRegisterCalc();
calcSaleTotal();
renderActiveTable();
renderPendingTable();
renderSales();
renderExpiryAlerts();
renderStaffTable();
renderStaffByWorker();
if (byId('saleDate')) byId('saleDate').value = new Date().toISOString().slice(0, 10);
renderClosure();
renderReports();
setupCsvTools();
