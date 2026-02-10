const form = document.getElementById('gym-form');
const results = document.getElementById('results');
const summary = document.getElementById('summary');
const foods = document.getElementById('foods');

const foodByGoal = {
  lose: [
    'Desayuno: yogur griego + avena + frutos rojos',
    'Almuerzo: pechuga de pollo con ensalada y quinoa',
    'Cena: pescado al horno con verduras al vapor',
    'Snacks: fruta, frutos secos en porciones pequeñas'
  ],
  maintain: [
    'Desayuno: huevos revueltos + pan integral + fruta',
    'Almuerzo: carne magra + arroz integral + ensalada',
    'Cena: tortilla de verduras + palta + ensalada',
    'Snacks: yogur natural, queso fresco, fruta'
  ],
  gain: [
    'Desayuno: avena con leche, banana y mantequilla de maní',
    'Almuerzo: arroz + carne magra + legumbres + aceite de oliva',
    'Cena: pasta integral con pollo y verduras',
    'Snacks: licuado de proteína, frutos secos, sándwich integral'
  ]
};

function calculateCalories({ sex, weight, height, age, activity, goal }) {
  const bmr =
    sex === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  let calories = bmr * activity;

  if (goal === 'lose') calories -= 400;
  if (goal === 'gain') calories += 350;

  return Math.round(calories);
}

function macroSplit(calories, goal) {
  const ratios = {
    lose: { protein: 0.35, carbs: 0.35, fats: 0.3 },
    maintain: { protein: 0.3, carbs: 0.4, fats: 0.3 },
    gain: { protein: 0.25, carbs: 0.5, fats: 0.25 }
  };

  const selected = ratios[goal];
  return {
    protein: Math.round((calories * selected.protein) / 4),
    carbs: Math.round((calories * selected.carbs) / 4),
    fats: Math.round((calories * selected.fats) / 9)
  };
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

  const calories = calculateCalories(data);
  const macros = macroSplit(calories, data.goal);

  const goalText = {
    lose: 'bajar de peso',
    maintain: 'mantener peso',
    gain: 'subir de peso'
  };

  summary.innerHTML = `
    <p><strong>Alumno:</strong> ${data.name}</p>
    <p><strong>Objetivo:</strong> ${goalText[data.goal]}</p>
    <p><strong>Calorías diarias estimadas:</strong> ${calories} kcal</p>
    <p><strong>Macros orientativas:</strong> Proteínas ${macros.protein} g, Carbohidratos ${macros.carbs} g, Grasas ${macros.fats} g.</p>
  `;

  foods.innerHTML = '';
  foodByGoal[data.goal].forEach((food) => {
    const item = document.createElement('li');
    item.textContent = food;
    foods.appendChild(item);
  });

  results.classList.remove('hidden');
});
