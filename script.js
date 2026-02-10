const form = document.getElementById('gym-form');
const results = document.getElementById('results');
const summary = document.getElementById('summary');
const macroBars = document.getElementById('macro-bars');
const projection = document.getElementById('projection');
const foods = document.getElementById('foods');
const routine = document.getElementById('routine');

const registerForm = document.getElementById('register-form');
const registerError = document.getElementById('register-error');
const serviceType = document.getElementById('serviceType');
const peopleCount = document.getElementById('peopleCount');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const basePrice = document.getElementById('basePrice');
const advancePaid = document.getElementById('advancePaid');
const totalPay = document.getElementById('totalPay');
const balance = document.getElementById('balance');
const previewBtn = document.getElementById('preview-btn');
const registerTableBody = document.getElementById('register-table-body');
const expiryAlerts = document.getElementById('expiry-alerts');

const salesForm = document.getElementById('sales-form');
const salesError = document.getElementById('sales-error');
const productName = document.getElementById('productName');
const unitsSold = document.getElementById('unitsSold');
const unitPrice = document.getElementById('unitPrice');
const finalPrice = document.getElementById('finalPrice');
const salesTableBody = document.getElementById('sales-table-body');

const summaryModal = document.getElementById('summary-modal');
const summaryContent = document.getElementById('summary-content');
const closeModalBtn = document.getElementById('close-modal-btn');

const tabButtons = document.querySelectorAll('.tab-btn');
const appSections = document.querySelectorAll('.app-section');

const STORAGE_KEYS = {
  registrations: 'zonaGymRegistrations',
  sales: 'zonaGymSales'
};

const goalText = { lose: 'Bajar de peso', maintain: 'Mantener peso', gain: 'Subir de peso' };
const macrosByGoal = {
  lose: { protein: 0.35, carbs: 0.35, fats: 0.3 },
  maintain: { protein: 0.3, carbs: 0.4, fats: 0.3 },
  gain: { protein: 0.25, carbs: 0.5, fats: 0.25 }
};

const serviceCatalog = {
  maquinas: { label: 'Solo máquinas', regular: 50, promo2plus: 50 },
  bailes: { label: 'Solo bailes', regular: 50, promo2plus: 50 },
  maquina_baile: { label: 'Máquina + baile', regular: 60, promo2plus: 50 },
  baile_jumping: { label: 'Baile + jumping', regular: 60, promo2plus: 50 },
  '3servicios': { label: 'Los 3 servicios', regular: 70, promo2plus: 60 }
};

const foodByGoal = {
  lose: [
    { name: 'Pollo guisado + arroz + ensalada', portion: '150 g pollo + 120 g arroz cocido', protein: 41, carbs: 36, fats: 10, budget: 'Económico', region: 'Costa / Sierra' },
    { name: 'Tortilla de 2 huevos + papa sancochada', portion: '2 huevos + 150 g papa', protein: 14, carbs: 30, fats: 10, budget: 'Económico', region: 'Todo el Perú' },
    { name: 'Pescado a la plancha + camote', portion: '140 g pescado + 120 g camote', protein: 30, carbs: 27, fats: 6, budget: 'Medio', region: 'Costa' }
  ],
  maintain: [
    { name: 'Seco de pollo con frejoles', portion: '150 g pollo + 120 g frejol', protein: 38, carbs: 30, fats: 12, budget: 'Económico', region: 'Costa / Norte' },
    { name: 'Tarwi + cancha + queso', portion: '100 g tarwi + 20 g cancha + 40 g queso', protein: 22, carbs: 17, fats: 12, budget: 'Muy económico', region: 'Sierra' },
    { name: 'Atún con yuca sancochada', portion: '1 lata atún + 150 g yuca', protein: 28, carbs: 41, fats: 8, budget: 'Económico', region: 'Selva / Costa' }
  ],
  gain: [
    { name: 'Tallarín rojo con pollo', portion: '240 g tallarín + 150 g pollo', protein: 42, carbs: 68, fats: 16, budget: 'Económico', region: 'Todo el Perú' },
    { name: 'Arroz con huevo + palta', portion: '200 g arroz + 2 huevos + 50 g palta', protein: 19, carbs: 58, fats: 19, budget: 'Muy económico', region: 'Todo el Perú' },
    { name: 'Frejoles + arroz + huevo', portion: '150 g frejol + 130 g arroz + 1 huevo', protein: 24, carbs: 61, fats: 11, budget: 'Muy económico', region: 'Todo el Perú' }
  ]
};

const routineByGoal = {
  lose: [
    { day: 'Lunes', focus: 'Piernas + cardio', tasks: ['Sentadillas 4x12', 'Zancadas 3x14', 'Bicicleta 25 min'] },
    { day: 'Martes', focus: 'Espalda + abdomen', tasks: ['Remo 4x12', 'Jalón al pecho 4x10', 'Plancha 4x40s'] },
    { day: 'Miércoles', focus: 'Cardio HIIT', tasks: ['HIIT 20 min', 'Caminata 30 min', 'Movilidad 15 min'] },
    { day: 'Jueves', focus: 'Pecho + tríceps', tasks: ['Press banca 4x10', 'Fondos 3x12', 'Cuerda 12 min'] },
    { day: 'Viernes', focus: 'Pierna posterior + glúteo', tasks: ['Peso muerto rumano 4x10', 'Hip thrust 4x12', 'Escaladora 15 min'] },
    { day: 'Sábado', focus: 'Full body ligero', tasks: ['Circuito 5 ejercicios x 3 rondas', 'Core 15 min', 'Elíptica 20 min'] }
  ],
  maintain: [
    { day: 'Lunes', focus: 'Pecho + hombro', tasks: ['Press banca 4x8', 'Press militar 4x10', 'Elevaciones laterales 3x12'] },
    { day: 'Martes', focus: 'Piernas completas', tasks: ['Sentadilla 4x8', 'Prensa 4x10', 'Gemelos 4x15'] },
    { day: 'Miércoles', focus: 'Cardio moderado + core', tasks: ['Trote suave 30 min', 'Crunch 4x15', 'Plancha 4x40s'] },
    { day: 'Jueves', focus: 'Espalda + bíceps', tasks: ['Dominadas asistidas 4x8', 'Remo 4x10', 'Curl bíceps 3x12'] },
    { day: 'Viernes', focus: 'Pierna + glúteo', tasks: ['Peso muerto 4x8', 'Hip thrust 4x10', 'Abductores 3x15'] },
    { day: 'Sábado', focus: 'Full body técnico', tasks: ['Circuito con barra 40 min', 'Movilidad 15 min', 'Caminata 20 min'] }
  ],
  gain: [
    { day: 'Lunes', focus: 'Pecho pesado + tríceps', tasks: ['Press banca 5x6', 'Press inclinado 4x8', 'Fondos lastrados 4x8'] },
    { day: 'Martes', focus: 'Pierna fuerza', tasks: ['Sentadilla 5x5', 'Prensa 4x8', 'Extensiones 4x12'] },
    { day: 'Miércoles', focus: 'Espalda + bíceps', tasks: ['Peso muerto 5x5', 'Remo barra 4x8', 'Curl barra 4x10'] },
    { day: 'Jueves', focus: 'Hombros + core', tasks: ['Press militar 5x6', 'Elevación lateral 4x12', 'Rueda abdominal 4x10'] },
    { day: 'Viernes', focus: 'Pierna hipertrofia', tasks: ['Front squat 4x8', 'Curl femoral 4x12', 'Hip thrust 4x10'] },
    { day: 'Sábado', focus: 'Upper completo', tasks: ['Dominadas 4x8', 'Press inclinado mancuerna 4x10', 'Remo mancuerna 4x10'] }
  ]
};

const getStored = (key) => JSON.parse(localStorage.getItem(key) || '[]');
const saveStored = (key, data) => localStorage.setItem(key, JSON.stringify(data));

function calculateCalories({ sex, weight, height, age, activity, goal }) {
  const bmr = sex === 'male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
  const maintenanceCalories = bmr * activity;
  let targetCalories = maintenanceCalories;
  if (goal === 'lose') targetCalories -= 450;
  if (goal === 'gain') targetCalories += 350;
  return { maintenanceCalories: Math.round(maintenanceCalories), targetCalories: Math.round(targetCalories) };
}

function macroSplit(calories, goal) {
  const selected = macrosByGoal[goal];
  return {
    protein: { grams: Math.round((calories * selected.protein) / 4), percentage: Math.round(selected.protein * 100) },
    carbs: { grams: Math.round((calories * selected.carbs) / 4), percentage: Math.round(selected.carbs * 100) },
    fats: { grams: Math.round((calories * selected.fats) / 9), percentage: Math.round(selected.fats * 100) }
  };
}

function projectedWeightChange(maintenanceCalories, targetCalories, goal) {
  const deltaPerDay = targetCalories - maintenanceCalories;
  const weekly = Number(((deltaPerDay * 7) / 7700).toFixed(2));
  if (goal === 'maintain') return { weekly: 0, monthly: 0, message: 'Objetivo de mantenimiento: enfoque en recomposición corporal.' };
  return { weekly, monthly: Number((weekly * 4).toFixed(2)), message: `Si cumples el plan ${goal === 'lose' ? 'bajarías' : 'subirías'} aprox. ${Math.abs(weekly)} kg/semana.` };
}

function renderSummary(data, calories, macros, projectionData) {
  summary.innerHTML = `
    <h2>Plan para ${data.name}</h2>
    <p class="muted">Objetivo: <strong>${goalText[data.goal]}</strong></p>
    <div class="stat-grid">
      <div class="stat"><span class="label">Calorías mantenimiento</span><span class="value">${calories.maintenanceCalories} kcal</span></div>
      <div class="stat"><span class="label">Calorías objetivo</span><span class="value">${calories.targetCalories} kcal</span></div>
      <div class="stat"><span class="label">Cambio semanal</span><span class="value">${projectionData.weekly} kg</span></div>
      <div class="stat"><span class="label">Cambio mensual</span><span class="value">${projectionData.monthly} kg</span></div>
    </div>
  `;

  macroBars.innerHTML = '';
  ['protein', 'carbs', 'fats'].forEach((macro) => {
    const row = document.createElement('div');
    row.className = 'macro-row';
    row.innerHTML = `<div class="macro-head"><span>${macro === 'protein' ? 'Proteínas' : macro === 'carbs' ? 'Carbohidratos' : 'Grasas'}</span><span>${macros[macro].grams} g · ${macros[macro].percentage}%</span></div><div class="track"><div class="fill ${macro}" style="width:${macros[macro].percentage}%"></div></div>`;
    macroBars.appendChild(row);
  });

  projection.innerHTML = `<div class="projection-box"><p>${projectionData.message}</p></div>`;
}

function renderFoods(goal) {
  foods.innerHTML = '';
  foodByGoal[goal].forEach((food) => {
    const item = document.createElement('article');
    item.className = 'food-item';
    item.innerHTML = `<h4>${food.name}</h4><p class="muted">Porción sugerida: ${food.portion}</p><ul><li>Proteína: ${food.protein} g</li><li>Carbohidratos: ${food.carbs} g</li><li>Grasas: ${food.fats} g</li></ul><div class="food-meta"><span class="pill">Costo: ${food.budget}</span><span class="pill">Zona: ${food.region}</span></div>`;
    foods.appendChild(item);
  });
}

function renderRoutine(goal) {
  routine.innerHTML = '';
  routineByGoal[goal].forEach((entry) => {
    const card = document.createElement('article');
    card.className = 'day-card';
    card.innerHTML = `<h4>${entry.day}</h4><p class="muted">${entry.focus}</p><ul>${entry.tasks.map((task) => `<li>${task}</li>`).join('')}</ul>`;
    routine.appendChild(card);
  });
}

function calculateEndDate(dateISO) {
  if (!dateISO) return '';
  const date = new Date(`${dateISO}T00:00:00`);
  date.setMonth(date.getMonth() + 1);
  return date.toISOString().split('T')[0];
}

function getServicePrice() {
  const service = serviceCatalog[serviceType.value];
  if (!service) return 0;
  return peopleCount.value === '2plus' ? service.promo2plus : service.regular;
}

function calculatePaymentFields() {
  const price = getServicePrice();
  const advance = Number(advancePaid.value || 0);
  basePrice.value = price;
  totalPay.value = price;
  balance.value = Math.max(price - advance, 0).toFixed(2);
}

function updateEndDateField() {
  endDate.value = calculateEndDate(startDate.value);
}

function showMessage(el, messages) {
  if (messages.length === 0) {
    el.classList.add('hidden');
    el.textContent = '';
    return;
  }
  el.classList.remove('hidden');
  el.textContent = messages.join(' ');
}

function validateRegisterForm() {
  const errors = [];
  const name = document.getElementById('fullName').value.trim();
  const dni = document.getElementById('dni').value.trim();
  const advance = Number(advancePaid.value || 0);
  const price = getServicePrice();

  if (!name) errors.push('El nombre es obligatorio.');
  if (!dni) errors.push('El DNI/ID es obligatorio.');
  if (!startDate.value) errors.push('La fecha de inscripción es obligatoria.');
  if (!serviceType.value) errors.push('Selecciona un servicio.');
  if (Number.isNaN(advance) || advance < 0) errors.push('El adelanto debe ser válido.');
  if (advance > price) errors.push('El adelanto no puede ser mayor al total.');

  return errors;
}

function renderRegisterSummary() {
  const service = serviceCatalog[serviceType.value];
  summaryContent.innerHTML = `
    <p><strong>Cliente:</strong> ${document.getElementById('fullName').value.trim()}</p>
    <p><strong>DNI:</strong> ${document.getElementById('dni').value.trim()}</p>
    <p><strong>Servicio:</strong> ${service.label}</p>
    <p><strong>Personas:</strong> ${peopleCount.value === '2plus' ? '2 a más (promoción)' : '1 persona'}</p>
    <p><strong>Ingreso:</strong> ${startDate.value}</p>
    <p><strong>Término:</strong> ${endDate.value}</p>
    <p><strong>Total:</strong> S/ ${Number(totalPay.value).toFixed(2)}</p>
    <p><strong>Adelanto:</strong> S/ ${Number(advancePaid.value || 0).toFixed(2)}</p>
    <p><strong>Saldo:</strong> S/ ${Number(balance.value || 0).toFixed(2)}</p>
  `;
}

function saveRegistration() {
  const all = getStored(STORAGE_KEYS.registrations);
  const service = serviceCatalog[serviceType.value];
  const record = {
    fullName: document.getElementById('fullName').value.trim(),
    dni: document.getElementById('dni').value.trim(),
    service: service.label,
    startDate: startDate.value,
    endDate: endDate.value,
    total: Number(totalPay.value || 0),
    balance: Number(balance.value || 0)
  };
  all.push(record);
  saveStored(STORAGE_KEYS.registrations, all);
}

function renderRegistrations() {
  const all = getStored(STORAGE_KEYS.registrations);
  registerTableBody.innerHTML = '';
  if (all.length === 0) {
    registerTableBody.innerHTML = '<tr><td colspan="7">Sin registros aún.</td></tr>';
    return;
  }
  all.forEach((r) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.fullName}</td><td>${r.dni}</td><td>${r.service}</td><td>${r.startDate}</td><td>${r.endDate}</td><td>S/ ${r.total.toFixed(2)}</td><td>S/ ${r.balance.toFixed(2)}</td>`;
    registerTableBody.appendChild(tr);
  });
}

function renderExpiryAlerts() {
  const all = getStored(STORAGE_KEYS.registrations);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const alerts = all.filter((r) => {
    const end = new Date(`${r.endDate}T00:00:00`);
    const diff = Math.round((end - today) / (1000 * 60 * 60 * 24));
    return diff >= 0 && diff <= 3;
  });

  if (alerts.length === 0) {
    expiryAlerts.textContent = 'Sin alertas por ahora.';
    return;
  }

  expiryAlerts.innerHTML = alerts
    .map((r) => `<div class="alert-item">⚠️ ${r.fullName} vence el ${r.endDate} (servicio: ${r.service})</div>`)
    .join('');
}

function calculateFinalSalePrice() {
  const units = Number(unitsSold.value || 0);
  const unit = Number(unitPrice.value || 0);
  finalPrice.value = (Math.max(units, 0) * Math.max(unit, 0)).toFixed(2);
}

function validateSaleForm() {
  const errors = [];
  if (!productName.value.trim()) errors.push('Nombre de producto obligatorio.');
  if (Number(unitsSold.value) <= 0) errors.push('Las unidades deben ser mayores a 0.');
  if (Number(unitPrice.value) < 0) errors.push('El precio unitario no puede ser negativo.');
  return errors;
}

function saveSale() {
  const all = getStored(STORAGE_KEYS.sales);
  all.push({
    product: productName.value.trim(),
    units: Number(unitsSold.value),
    unitPrice: Number(unitPrice.value),
    final: Number(finalPrice.value)
  });
  saveStored(STORAGE_KEYS.sales, all);
}

function renderSales() {
  const all = getStored(STORAGE_KEYS.sales);
  salesTableBody.innerHTML = '';
  if (all.length === 0) {
    salesTableBody.innerHTML = '<tr><td colspan="4">Sin ventas aún.</td></tr>';
    return;
  }
  all.forEach((s) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.product}</td><td>${s.units}</td><td>S/ ${s.unitPrice.toFixed(2)}</td><td>S/ ${s.final.toFixed(2)}</td>`;
    salesTableBody.appendChild(tr);
  });
}

function openModal() {
  summaryModal.classList.remove('hidden');
}
function closeModal() {
  summaryModal.classList.add('hidden');
}

function activateSection(sectionId) {
  appSections.forEach((section) => section.classList.toggle('hidden', section.id !== sectionId));
  tabButtons.forEach((button) => button.classList.toggle('active', button.dataset.target === sectionId));
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = {
    name: document.getElementById('name').value.trim(),
    age: Number(document.getElementById('age').value),
    sex: document.getElementById('sex').value,
    weight: Number(document.getElementById('weight').value),
    height: Number(document.getElementById('height').value),
    activity: Number(document.getElementById('activity').value),
    goal: document.getElementById('goal').value
  };
  if (!data.name) return;
  const calories = calculateCalories(data);
  const macros = macroSplit(calories.targetCalories, data.goal);
  const projectionData = projectedWeightChange(calories.maintenanceCalories, calories.targetCalories, data.goal);
  renderSummary(data, calories, macros, projectionData);
  renderFoods(data.goal);
  renderRoutine(data.goal);
  results.classList.remove('hidden');
});

serviceType.addEventListener('change', calculatePaymentFields);
peopleCount.addEventListener('change', calculatePaymentFields);
startDate.addEventListener('change', updateEndDateField);
advancePaid.addEventListener('input', calculatePaymentFields);

previewBtn.addEventListener('click', () => {
  const errors = validateRegisterForm();
  showMessage(registerError, errors);
  if (errors.length > 0) return;
  renderRegisterSummary();
  openModal();
});

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const errors = validateRegisterForm();
  showMessage(registerError, errors);
  if (errors.length > 0) return;
  saveRegistration();
  renderRegistrations();
  renderExpiryAlerts();
  renderRegisterSummary();
  openModal();
  registerForm.reset();
  advancePaid.value = 0;
  calculatePaymentFields();
  updateEndDateField();
});

unitsSold.addEventListener('input', calculateFinalSalePrice);
unitPrice.addEventListener('input', calculateFinalSalePrice);

salesForm.addEventListener('submit', (event) => {
  event.preventDefault();
  calculateFinalSalePrice();
  const errors = validateSaleForm();
  showMessage(salesError, errors);
  if (errors.length > 0) return;
  saveSale();
  renderSales();
  salesForm.reset();
  finalPrice.value = '0.00';
});

closeModalBtn.addEventListener('click', closeModal);
summaryModal.addEventListener('click', (event) => {
  if (event.target === summaryModal) closeModal();
});

tabButtons.forEach((button) => button.addEventListener('click', () => activateSection(button.dataset.target)));

calculatePaymentFields();
calculateFinalSalePrice();
renderRegistrations();
renderExpiryAlerts();
renderSales();
