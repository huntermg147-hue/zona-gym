import { STORAGE_KEYS, getStored, setStored } from './storage.js';

const VIP_CONFIG_KEY = 'zonaGymVipConfig';

export function getVipConfig() {
  try {
    return JSON.parse(localStorage.getItem(VIP_CONFIG_KEY) || '{"enabled":false,"rule":"3x1"}');
  } catch {
    return { enabled: false, rule: '3x1' };
  }
}

export function setVipConfig(config) {
  localStorage.setItem(VIP_CONFIG_KEY, JSON.stringify(config));
}

function normalizeMembership(record, today) {
  const item = { ...record };
  item.membershipType = item.membershipType || 'normal';
  if (item.membershipType === 'vip' && item.vipEndDate && item.vipEndDate < today) {
    item.membershipType = 'normal';
  }
  return item;
}

export function syncVipStatus() {
  const today = new Date().toISOString().slice(0, 10);
  const active = getStored(STORAGE_KEYS.ACTIVE).map((r) => normalizeMembership(r, today));
  const pending = getStored(STORAGE_KEYS.PENDING).map((r) => normalizeMembership(r, today));
  setStored(STORAGE_KEYS.ACTIVE, active);
  setStored(STORAGE_KEYS.PENDING, pending);
}

export function initMembershipModule() {
  syncVipStatus();
  const auto = document.getElementById('vip-auto-promo');
  const rule = document.getElementById('vip-promo-rule');
  const cfg = getVipConfig();
  if (auto) auto.checked = !!cfg.enabled;
  if (rule) rule.value = cfg.rule || '3x1';

  const save = () => setVipConfig({ enabled: !!auto?.checked, rule: rule?.value || '3x1' });
  auto?.addEventListener('change', save);
  rule?.addEventListener('change', save);
}
