export function normalizeStaffName(name) {
  const v = String(name || '').toLowerCase();
  if (v === 'edson') return 'edson';
  if (v === 'charo') return 'charo';
  return v;
}

export function renderStaffTable(rows = []) {
  return rows.map((r) => `${r.staffName}|${r.product}|${r.cash}|${r.date}`);
}

export function renderStaffByWorker(rows = []) {
  return rows.reduce((acc, row) => {
    const key = normalizeStaffName(row.staffName);
    if (!acc[key]) acc[key] = { total: 0, moves: 0 };
    acc[key].total += Number(row.cash || 0);
    acc[key].moves += 1;
    return acc;
  }, {});
}
