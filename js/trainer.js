import { STORAGE_KEYS, getStored, setStored } from './storage.js';

const OBS_KEY = 'zonaGymTrainerObservations';

function getObs() {
  try { return JSON.parse(localStorage.getItem(OBS_KEY) || '{}'); } catch { return {}; }
}

function setObs(v) { localStorage.setItem(OBS_KEY, JSON.stringify(v)); }

export function renderTrainerView(user) {
  const panel = document.getElementById('trainer-students');
  if (!panel) return;
  if (user.role !== 'entrenador') {
    panel.textContent = 'Disponible para rol entrenador.';
    return;
  }
  const active = getStored(STORAGE_KEYS.ACTIVE);
  const obs = getObs();
  if (!active.length) {
    panel.textContent = 'Sin alumnos activos.';
    return;
  }

  panel.innerHTML = active.map((a) => `
    <div class="alert-item">
      <strong>${a.fullName}</strong> · ${a.service} · ${a.membershipType === 'vip' ? 'VIP' : 'Normal'}<br/>
      Observación: <input data-obs-id="${a.id}" value="${obs[a.id] || ''}" placeholder="Ej: mejorar técnica de sentadilla" />
    </div>
  `).join('');

  panel.querySelectorAll('[data-obs-id]').forEach((input) => {
    input.addEventListener('change', () => {
      const current = getObs();
      current[input.dataset.obsId] = input.value;
      setObs(current);
    });
  });
}
