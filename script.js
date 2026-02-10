const form = document.getElementById('gym-form');
const results = document.getElementById('results');
const summary = document.getElementById('summary');
const macroBars = document.getElementById('macro-bars');
const projection = document.getElementById('projection');
const foods = document.getElementById('foods');
const routine = document.getElementById('routine');

const goalText = {
  lose: 'Bajar de peso',
  maintain: 'Mantener peso',
  gain: 'Subir de peso'
};

const macrosByGoal = {
  lose: { protein: 0.35, carbs: 0.35, fats: 0.3 },
  maintain: { protein: 0.3, carbs: 0.4, fats: 0.3 },
  gain: { protein: 0.25, carbs: 0.5, fats: 0.25 }
};

const foodByGoal = {
  lose: [
    { name: 'Pechuga de pollo', portion: '150 g', protein: 46, carbs: 0, fats: 5 },
    { name: 'Yogur griego natural', portion: '170 g', protein: 17, carbs: 6, fats: 4 },
    { name: 'Avena', portion: '50 g', protein: 8, carbs: 30, fats: 4 },
    { name: 'Salmón', portion: '140 g', protein: 31, carbs: 0, fats: 14 },
    { name: 'Quinoa cocida', portion: '120 g', protein: 5, carbs: 25, fats: 2 },
    { name: 'Almendras', portion: '25 g', protein: 5, carbs: 5, fats: 13 }
  ],
  maintain: [
    { name: 'Huevos enteros', portion: '2 unidades', protein: 12, carbs: 1, fats: 10 },
    { name: 'Carne magra', portion: '150 g', protein: 39, carbs: 0, fats: 9 },
    { name: 'Arroz integral cocido', portion: '150 g', protein: 4, carbs: 37, fats: 1 },
    { name: 'Pan integral', portion: '2 rebanadas', protein: 7, carbs: 24, fats: 2 },
    { name: 'Queso fresco', portion: '80 g', protein: 14, carbs: 3, fats: 8 },
    { name: 'Frutas mixtas', portion: '150 g', protein: 1, carbs: 20, fats: 0 }
  ],
  gain: [
    { name: 'Avena', portion: '80 g', protein: 13, carbs: 49, fats: 6 },
    { name: 'Leche descremada', portion: '300 ml', protein: 10, carbs: 15, fats: 1 },
    { name: 'Pasta integral cocida', portion: '180 g', protein: 10, carbs: 55, fats: 2 },
    { name: 'Pechuga de pavo', portion: '170 g', protein: 49, carbs: 0, fats: 4 },
    { name: 'Mantequilla de maní', portion: '30 g', protein: 8, carbs: 6, fats: 15 },
    { name: 'Nueces', portion: '30 g', protein: 5, carbs: 4, fats: 19 }
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

function calculateCalories({ sex, weight, height, age, activity, goal }) {
  const bmr = sex === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  const maintenanceCalories = bmr * activity;
  let targetCalories = maintenanceCalories;

  if (goal === 'lose') targetCalories -= 450;
  if (goal === 'gain') targetCalories += 350;

  return {
    maintenanceCalories: Math.round(maintenanceCalories),
    targetCalories: Math.round(targetCalories)
  };
}

function macroSplit(calories, goal) {
  const selected = macrosByGoal[goal];

  return {
    protein: {
      grams: Math.round((calories * selected.protein) / 4),
      percentage: Math.round(selected.protein * 100)
    },
    carbs: {
      grams: Math.round((calories * selected.carbs) / 4),
      percentage: Math.round(selected.carbs * 100)
    },
    fats: {
      grams: Math.round((calories * selected.fats) / 9),
      percentage: Math.round(selected.fats * 100)
    }
  };
}

function projectedWeightChange(maintenanceCalories, targetCalories, goal) {
  const deltaPerDay = targetCalories - maintenanceCalories;
  const weeklyChangeKg = Number(((deltaPerDay * 7) / 7700).toFixed(2));

  if (goal === 'maintain') {
    return {
      weekly: 0,
      monthly: 0,
      message: 'Objetivo de mantenimiento: el enfoque es recomposición corporal y rendimiento.'
    };
  }

  const monthlyChangeKg = Number((weeklyChangeKg * 4).toFixed(2));
  const verb = goal === 'lose' ? 'bajarías aprox.' : 'subirías aprox.';

  return {
    weekly: weeklyChangeKg,
    monthly: monthlyChangeKg,
    message: `Si cumples el plan, ${verb} ${Math.abs(weeklyChangeKg)} kg por semana.`
  };
}

function renderSummary(data, calories, macros, projectionData) {
  summary.innerHTML = `
    <h2>Plan para ${data.name}</h2>
    <p class="muted">Objetivo: <strong>${goalText[data.goal]}</strong></p>
    <div class="stat-grid">
      <div class="stat">
        <span class="label">Calorías mantenimiento</span>
        <span class="value">${calories.maintenanceCalories} kcal</span>
      </div>
      <div class="stat">
        <span class="label">Calorías objetivo</span>
        <span class="value">${calories.targetCalories} kcal</span>
      </div>
      <div class="stat">
        <span class="label">Cambio estimado semanal</span>
        <span class="value">${projectionData.weekly >= 0 ? '+' : ''}${projectionData.weekly} kg</span>
      </div>
      <div class="stat">
        <span class="label">Cambio estimado mensual</span>
        <span class="value">${projectionData.monthly >= 0 ? '+' : ''}${projectionData.monthly} kg</span>
      </div>
    </div>
    <span class="tag">Los resultados son orientativos y pueden variar según adherencia y descanso.</span>
  `;

  macroBars.innerHTML = '';

  ['protein', 'carbs', 'fats'].forEach((macro) => {
    const row = document.createElement('div');
    row.className = 'macro-row';
    row.innerHTML = `
      <div class="macro-head">
        <span>${macro === 'protein' ? 'Proteínas' : macro === 'carbs' ? 'Carbohidratos' : 'Grasas'}</span>
        <span>${macros[macro].grams} g · ${macros[macro].percentage}%</span>
      </div>
      <div class="track">
        <div class="fill ${macro}" style="width: ${macros[macro].percentage}%"></div>
      </div>
    `;

    macroBars.appendChild(row);
  });

  projection.innerHTML = `
    <div class="projection-box">
      <p>${projectionData.message}</p>
    </div>
    <div class="projection-box">
      <p><strong>Días sugeridos de entrenamiento:</strong> 5 a 6 días por semana, con 1 día de descanso total.</p>
    </div>
  `;
}

function renderFoods(goal) {
  foods.innerHTML = '';

  foodByGoal[goal].forEach((food) => {
    const item = document.createElement('article');
    item.className = 'food-item';
    item.innerHTML = `
      <h4>${food.name}</h4>
      <p class="muted">Porción sugerida: ${food.portion}</p>
      <ul>
        <li>Proteína: ${food.protein} g</li>
        <li>Carbohidratos: ${food.carbs} g</li>
        <li>Grasas: ${food.fats} g</li>
      </ul>
    `;
    foods.appendChild(item);
  });
}

function renderRoutine(goal) {
  routine.innerHTML = '';

  routineByGoal[goal].forEach((entry) => {
    const card = document.createElement('article');
    card.className = 'day-card';
    card.innerHTML = `
      <h4>${entry.day}</h4>
      <p class="muted">${entry.focus}</p>
      <ul>${entry.tasks.map((task) => `<li>${task}</li>`).join('')}</ul>
    `;
    routine.appendChild(card);
  });
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

  if (!data.name) {
    return;
  }

  const calories = calculateCalories(data);
  const macros = macroSplit(calories.targetCalories, data.goal);
  const projectionData = projectedWeightChange(calories.maintenanceCalories, calories.targetCalories, data.goal);

  renderSummary(data, calories, macros, projectionData);
  renderFoods(data.goal);
  renderRoutine(data.goal);

  results.classList.remove('hidden');
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
