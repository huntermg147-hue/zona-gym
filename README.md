# Zona Gym Pro

Sistema web para gimnasio con **5 secciones**:

1. Plan nutricional + rutina.
2. Registro de gym.
3. Ventas de productos.
4. Pagos pendientes.
5. Búsqueda de usuario.

## Precios y promociones

### Precio regular (1 persona)
- Solo máquinas: S/ 50
- Solo bailes: S/ 50
- Máquina + baile: S/ 60
- Baile + jumping: S/ 60
- Los 3 servicios: S/ 70

### Promoción (2 a más personas)
- Máquina + baile: S/ 50
- Baile + jumping: S/ 50
- Los 3 servicios: S/ 60
- Solo máquinas y solo bailes se mantienen en S/ 50

## Funcionalidades agregadas

- Botón para borrar registros de gym **por persona** (no borra todo).
- Sección de pagos pendientes para usuarios con adelanto parcial.
- Posibilidad de agregar pagos adicionales; cuando el saldo llega a 0:
  - sale de pagos pendientes,
  - pasa automáticamente a registros activos,
  - evitando duplicados.
- Alertas de vencimiento con 3 días de anticipación.
- Sección de búsqueda para ver datos completos del usuario, vencimiento y estado de pago.
- Módulo de ventas con cálculo automático de precio final (`unidades x precio unitario`).

## Ejecución

```bash
python3 -m http.server 8000
```

Abrir:

```text
http://localhost:8000
```
