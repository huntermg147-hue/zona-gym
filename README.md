# Zona Gym

Aplicación web simple para registrar datos básicos de un alumno y generar una recomendación nutricional inicial.

## Qué hace

- Recibe datos del alumno (edad, sexo, peso, estatura, actividad).
- Permite elegir objetivo: bajar, mantener o subir de peso.
- Calcula calorías estimadas usando fórmula de Mifflin-St Jeor.
- Sugiere distribución orientativa de macronutrientes.
- Muestra comidas recomendadas según objetivo.

## Ejecutar localmente

Como es una app estática, puedes abrir `index.html` directamente o usar:

```bash
python3 -m http.server 8000
```

Luego abre `http://localhost:8000`.

## Nota

Esta herramienta es educativa y no reemplaza asesoría de nutricionista.
