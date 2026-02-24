export function renderStudentView(user) {
  const panel = document.getElementById('student-panel');
  if (!panel) return;
  if (user.role !== 'alumno') {
    panel.textContent = 'Disponible para rol alumno.';
    return;
  }

  const isVip = user.membershipType === 'vip';
  if (!isVip) {
    panel.innerHTML = `
      <div class="alert-item"><strong>Plan gratis:</strong> rutina básica + plan nutricional básico.</div>
      <div class="alert-item">Para acceder a proyección, historial y recomendaciones clínicas completas, activa VIP.</div>
    `;
    return;
  }

  panel.innerHTML = `
    <div class="alert-item"><strong>Plan VIP activo</strong></div>
    <div class="alert-item">Acceso: rutina completa, proyección, historial y recomendaciones clínicas.</div>
    <div class="alert-item">Recuerda revisar alertas de vencimiento de tu membresía VIP.</div>
  `;
}
