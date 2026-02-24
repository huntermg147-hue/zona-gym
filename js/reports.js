export function buildCsvRows(rows) {
  return rows.map((r) => r.join(';')).join('\n');
}

export function exportToCsv(filename, rows) {
  const blob = new Blob([`\ufeff${buildCsvRows(rows)}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function exportToExcelReport() {
  // reservado para evolución del módulo oficial
}

export function importFromCsvText(text) {
  return text.split('\n').filter(Boolean).map((line) => line.split(';'));
}
