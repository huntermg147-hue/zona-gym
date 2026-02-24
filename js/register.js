import { getServicePrice } from './services.js';

export function validateRegister(data) {
  const errors = [];
  if (!data.fullName?.trim()) errors.push('Nombre obligatorio.');
  if (!data.startDate) errors.push('Fecha de inscripción obligatoria.');
  if (!data.serviceKey) errors.push('Selecciona servicio.');
  if (!Number.isFinite(data.paid) || data.paid < 0) errors.push('Adelanto inválido.');
  if (data.paid > data.total) errors.push('Adelanto no puede ser mayor al total.');
  return errors;
}

export function currentRegisterData(formValues) {
  const baseTotal = getServicePrice(formValues.serviceKey, formValues.people);
  const total = Number(formValues.customPrice || 0) > 0 ? Number(formValues.customPrice) : baseTotal;
  const paid = Number(formValues.paid || 0);
  return {
    ...formValues,
    baseTotal,
    total,
    paid,
    balance: Math.max(total - paid, 0)
  };
}

export function pushRegistration(record, active, pending) {
  const isPending = record.paid > 0 && record.balance > 0;
  if (isPending) return { active, pending: [...pending, record] };
  return { active: [...active, record], pending };
}
