export const goalText = { lose: 'Bajar de peso', maintain: 'Mantener peso', gain: 'Subir de peso' };
export const macrosByGoal = {
  lose: { protein: 0.35, carbs: 0.35, fats: 0.3 },
  maintain: { protein: 0.3, carbs: 0.4, fats: 0.3 },
  gain: { protein: 0.25, carbs: 0.5, fats: 0.25 }
};

export const foodByGoal = { lose: [], maintain: [], gain: [] };
export const routineByGoal = { lose: [], maintain: [], gain: [] };

export function calculateCalories({ sex, weight, height, age, activity, goal }) {
  const bmr = sex === 'male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
  const maintenance = bmr * activity;
  let target = maintenance;
  if (goal === 'lose') target -= 450;
  if (goal === 'gain') target += 350;
  return { maintenance: Math.round(maintenance), target: Math.round(target) };
}

export function splitMacros(calories, goal) {
  const m = macrosByGoal[goal];
  return {
    protein: { g: Math.round((calories * m.protein) / 4), p: Math.round(m.protein * 100) },
    carbs: { g: Math.round((calories * m.carbs) / 4), p: Math.round(m.carbs * 100) },
    fats: { g: Math.round((calories * m.fats) / 9), p: Math.round(m.fats * 100) }
  };
}

export function calculateBodyComposition({ sex, height, waist, neck, hip, weight }) {
  const heightNum = Number(height);
  const waistNum = Number(waist);
  const neckNum = Number(neck);
  const hipNum = Number(hip || 0);
  if (!heightNum || !waistNum || !neckNum) return null;
  let bodyFat;
  if (sex === 'male') bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(Math.max(waistNum - neckNum, 1)) + 0.15456 * Math.log10(heightNum)) - 450;
  else {
    if (!hipNum) return null;
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(Math.max(waistNum + hipNum - neckNum, 1)) + 0.22100 * Math.log10(heightNum)) - 450;
  }
  const fatMass = (Number(weight) * bodyFat) / 100;
  const leanMass = Number(weight) - fatMass;
  return { bodyFat, leanPercent: 100 - bodyFat, fatMass, leanMass };
}

export function classifyBmi(bmi) {
  if (bmi < 18.5) return 'Bajo peso';
  if (bmi < 25) return 'Peso saludable';
  if (bmi < 30) return 'Sobrepeso';
  if (bmi < 35) return 'Obesidad grado I';
  if (bmi < 40) return 'Obesidad grado II';
  return 'Obesidad grado III';
}

export function classifyBodyFat(sex, bodyFatPercent) {
  if (sex === 'male') {
    if (bodyFatPercent < 6) return 'Muy bajo';
    if (bodyFatPercent < 14) return 'Atlético';
    if (bodyFatPercent < 18) return 'Fitness';
    if (bodyFatPercent < 25) return 'Aceptable';
    return 'Elevado';
  }
  if (bodyFatPercent < 14) return 'Muy bajo';
  if (bodyFatPercent < 21) return 'Atlético';
  if (bodyFatPercent < 25) return 'Fitness';
  if (bodyFatPercent < 32) return 'Aceptable';
  return 'Elevado';
}

export function getClinicalRecommendation(goal, bmiStatus) {
  return `Objetivo ${goal} con estado ${bmiStatus}: requiere seguimiento profesional periódico.`;
}

export function getConditionGuidance(condition, severity) {
  return { warning: `Condición: ${condition}`, avoid: 'Evitar dolor agudo.', plan: `Intensidad ${severity}.` };
}
