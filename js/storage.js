export const STORAGE_KEYS = {
  ACTIVE: 'zonaGymActiveMembers',
  PENDING: 'zonaGymPendingMembers',
  SALES: 'zonaGymSales',
  STAFF: 'zonaGymStaffMovements'
};

export function getStored(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

export function setStored(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
}
