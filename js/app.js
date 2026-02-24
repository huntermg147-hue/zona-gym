import { STORAGE_KEYS, getStored, setStored, generateId } from './storage.js';
import { serviceCatalog, getServicePrice, calculateEndDate } from './services.js';
import { currentRegisterData, validateRegister, pushRegistration } from './register.js';
import { applyPaymentToPending, shouldMoveToActive } from './payments.js';
import { calcSaleTotal, createSaleRecord } from './sales.js';
import { buildCsvRows, exportToCsv, exportToExcelReport, importFromCsvText } from './reports.js';
import {
  calculateCalories,
  splitMacros,
  calculateBodyComposition,
  classifyBmi,
  classifyBodyFat,
  getClinicalRecommendation,
  getConditionGuidance,
  foodByGoal,
  routineByGoal,
  macrosByGoal
} from './nutrition.js';
import { normalizeStaffName, renderStaffTable, renderStaffByWorker } from './staff.js';
import { bootstrapUi } from './ui.js';

// Punto de entrada oficial modular.
// Mantenemos la funcionalidad existente del sistema actual mientras la lógica
// se migra progresivamente a los módulos anteriores.
void {
  STORAGE_KEYS,
  getStored,
  setStored,
  generateId,
  serviceCatalog,
  getServicePrice,
  calculateEndDate,
  currentRegisterData,
  validateRegister,
  pushRegistration,
  applyPaymentToPending,
  shouldMoveToActive,
  calcSaleTotal,
  createSaleRecord,
  buildCsvRows,
  exportToCsv,
  exportToExcelReport,
  importFromCsvText,
  calculateCalories,
  splitMacros,
  calculateBodyComposition,
  classifyBmi,
  classifyBodyFat,
  getClinicalRecommendation,
  getConditionGuidance,
  foodByGoal,
  routineByGoal,
  macrosByGoal,
  normalizeStaffName,
  renderStaffTable,
  renderStaffByWorker
};

await bootstrapUi();
