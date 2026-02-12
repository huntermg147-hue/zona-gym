# Zona Gym Pro

Sistema web para gimnasio con **8 secciones**:

1. Plan nutricional + rutina.
2. Registro de gym.
3. Ventas de productos.
4. Pagos pendientes.
5. Búsqueda de usuario.
6. Control de personal del gym.
7. Reportes.
8. Cierre de caja.

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

- En Registro de gym se usa **número de celular** en lugar de DNI.
- En Registro puedes usar **Precio acordado (opcional)** para casos especiales; si está vacío, se usa la tarifa base automática.
- Botón para borrar registros de gym **por persona** (no borra todo).
- Sección de pagos pendientes para usuarios con adelanto parcial.
- Si el adelanto es `0`, la inscripción se guarda en Registro de gym (no pasa a pendientes).
- Posibilidad de agregar pagos adicionales; cuando el saldo llega a 0:
  - sale de pagos pendientes,
  - pasa automáticamente a registros activos,
  - evitando duplicados.
- Alertas de vencimiento con 3 días de anticipación.
- Sección de búsqueda para ver datos completos del usuario, vencimiento y estado de pago.
- Módulo de ventas con cálculo automático de precio final (`unidades x precio unitario`).
- Control de personal del gym con registro de consumo/adelantos y vista agrupada por trabajador.
- Cierre de caja con resumen diario/mensual por: máquinas, baile+jumping y ventas, separado por efectivo y yape.
- Reportes con: resumen mensual por servicio, deudas pendientes, top productos, resumen por trabajador y caja consolidada exportable a CSV.
- En plan nutricional se restauró la sección inicial y se ampliaron las comidas recomendadas con mayor detalle: porción, macros por porción, kcal aproximadas, costo estimado, región sugerida y momento de consumo.

## Ejecución

```bash
python3 -m http.server 8000
```

Abrir:

```text
http://localhost:8000
```


## Exportar e importar CSV (Excel)

- En la sección **Registro de gym** puedes usar `Exportar datos (CSV)` para descargar un respaldo compatible con Excel.
- También puedes usar `Importar datos (CSV)` para restaurar activos, pendientes, ventas y personal desde un backup.
- El CSV se exporta con separador `;` para que Excel lo abra en columnas automáticamente.
- También puedes usar `Exportar informe (Excel)` para generar un archivo presentable con encabezados en español, bordes y formato de informe.

## Persistencia de datos

- Los registros (activos, pendientes, ventas y personal) se guardan en `localStorage` del navegador.
- Si cierras y abres la app otro día en el mismo navegador/equipo, los datos se mantienen.
- Si borras datos del navegador, se perderán.
