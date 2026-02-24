import { bootstrapUi } from './ui.js';
import { initMembershipModule } from './membership.js';
import { initAuth } from './auth.js';

// Arranque base legacy + capa modular V2 (roles, VIP, vistas dinámicas).
await bootstrapUi();
initMembershipModule();
initAuth();
