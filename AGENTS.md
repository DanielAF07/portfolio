# AGENTS.md

Instrucciones para agentes que trabajan en este portfolio/CV.

## CV: optimización contra una Job Description (ATS / filtro IA)

Cuando el usuario quiera enfocar su CV a una vacante específica, usa este prompt como punto de partida. El objetivo es **pasar el primer filtro automatizado (ATS / screening con IA) que corre ANTES de que un humano lea el CV.**

### Prompt base

> Actúa como reclutador técnico senior + experto en ATS. Evalúa mi CV simulando el PRIMER filtro automatizado (ATS / screening con IA) que corre ANTES de que un humano lo vea. Revisa: (a) parseabilidad del documento que se sube, (b) match de keywords contra el rol objetivo, (c) señales que un screener penaliza o premia. Dime si paso ese filtro y qué corregir para asegurarlo.

### Cómo usarlo

1. **Pide la Job Description** al usuario. El score de un ATS es **relativo a la vacante** — sin JD solo hay best-practices genéricas.
2. **Optimiza keywords y títulos** contra ESA vacante (no a ciegas): herramientas, stack, seniority y el título exacto del puesto.
3. **Edita el documento que realmente se parsea** (versión `print`/PDF), no la web. El filtro IA lee el PDF que se sube a LinkedIn/Workday/Greenhouse, no el sitio.

### Realidades del renderizado (verificadas)

- **`cv.json` es la fuente que renderiza el sitio** (alias `@cv`). `cv_espanol.json` NO se importa en ningún componente; mantener en sync manualmente si se usa.
- **Experience renderiza `summary` + `highlights`** (highlights como bullets bajo cada trabajo). Las métricas pueden ir en cualquiera de los dos; ambos se parsean.
- **Skills renderiza solo `name`** (chip de texto; ícono solo si existe en `SKILLS_ICONS`). `level` y `keywords` no se renderizan.
- **Hero (print/PDF) expone** name, label, ubicación y `email • phone • LinkedIn • GitHub`.
- **Education renderiza solo** `institution`, fechas y `area`. `courses`, `studyType`, `score`, `url` no se muestran.
