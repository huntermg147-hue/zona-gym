export const serviceCatalog = {
  rutina: { label: 'Solo rutina', regular: 5, promo2plus: 5 },
  maquinas: { label: 'Solo máquinas', regular: 50, promo2plus: 50 },
  bailes: { label: 'Solo bailes', regular: 50, promo2plus: 50 },
  maquina_baile: { label: 'Máquina + baile', regular: 60, promo2plus: 50 },
  baile_jumping: { label: 'Baile + jumping', regular: 60, promo2plus: 50 },
  '3servicios': { label: 'Los 3 servicios', regular: 70, promo2plus: 60 }
};

export function getServicePrice(serviceKey, people) {
  const s = serviceCatalog[serviceKey];
  if (!s) return 0;
  return people === '2plus' ? s.promo2plus : s.regular;
}

export function calculateEndDate(startISO, serviceType) {
  if (!startISO) return '';
  const d = new Date(`${startISO}T00:00:00`);
  if (serviceType === 'rutina') d.setDate(d.getDate() + 1);
  else d.setMonth(d.getMonth() + 1);
  return d.toISOString().split('T')[0];
}
