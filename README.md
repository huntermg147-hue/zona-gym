# Zona Gym Pro

Aplicación web con 3 secciones:

1. Plan nutricional + rutina.
2. Registro de gym con promociones y alertas de vencimiento.
3. Ventas de productos.

## Registro de gym (precios corregidos)

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
- Solo máquinas y solo bailes mantienen S/ 50

## Funcionalidades clave

- El sistema pregunta si es 1 persona o 2+ para aplicar promociones.
- Calcula automáticamente precio base, total y saldo.
- Calcula fecha de término (mensual: +1 mes).
- Guarda registros de personas en almacenamiento local del navegador.
- Muestra alertas cuando faltan 3 días o menos para vencimiento.
- Permite registrar ventas de productos calculando precio final (`unidades x precio unitario`) y guarda historial.

## Cómo ejecutar

```bash
python3 -m http.server 8000
```

Abrir `http://localhost:8000`.
