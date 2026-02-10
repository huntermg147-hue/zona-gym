# Zona Gym Pro

Aplicación web con 2 secciones principales:

1. **Plan nutricional + rutina** para alumnos.
2. **Registro de inscripciones del gym** con cálculos automáticos de precio y saldo.

## Incluye

- Fondo visual tipo gimnasio para una experiencia más atractiva.
- Cálculo de calorías de mantenimiento y objetivo (según meta).
- Porcentaje y gramos de macronutrientes con barras visuales.
- Proyección orientativa de cambio semanal y mensual de peso.
- Sugerencias de comidas orientadas a público peruano (costa, sierra, selva y provincias), con opciones económicas.
- Rutina sugerida de Lunes a Sábado.
- Formulario de inscripción con:
  - nombre/apellido,
  - DNI o identificación,
  - fecha de inscripción,
  - tipo de servicio,
  - precio base,
  - adelanto,
  - total,
  - saldo,
  - fecha de término calculada automáticamente.
- Resumen previo en modal antes de confirmar la inscripción.

## Servicios y precios

- Rutina: **S/ 5** (servicio diario, fecha de término = mismo día).
- Máquinas: **S/ 50** (mensual).
- Bailes: **S/ 50** (mensual).
- Jumping: **S/ 50** (mensual).
- 3 servicios: **S/ 140** (mensual).

## Cómo ejecutar

```bash
python3 -m http.server 8000
```

Abrir en navegador:

```text
http://localhost:8000
```

## Nota importante

Las recomendaciones son orientativas. Para un plan clínico personalizado, consultar nutricionista y entrenador.
