# DonayViste

Plataforma web para comprar, vender y donar uniformes escolares en buen estado.
Proyecto de la I.E. La Candelaria (Medellín).

- Repositorio: [juanusuga033/PPI](https://github.com/juanusuga033/PPI)
- Demo: [https://juanusuga033.github.io/PPI/](https://juanusuga033.github.io/PPI/)

## Stack

- React 19 + Vite 8
- React Router 6
- Supabase (Auth, Postgres + RLS, Storage)
- GitHub Pages + GitHub Actions

## Instalación

```bash
git clone https://github.com/juanusuga033/PPI.git
cd PPI/28-07
cp .env.example .env
npm install
npm run dev
```

La copia canónica de la aplicación es `28-07/` (sin espacios, es la que despliega CI).
`DONA Y VISTE/` queda como archivo histórico hasta unificar por completo.

## Variables de entorno

Crear `.env` (nunca subirlo):

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Aplicar `supabase/migrations/` en el SQL Editor de Supabase.
Crear el bucket público `uniformes` y limitar MIME a JPG/PNG/WebP y 5 MB.

## Scripts

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor local |
| `npm run build` | Build de producción (`base` `/PPI/`) |
| `npm run preview` | Previsualiza el build |
| `npm run lint` | ESLint |

## Estructura

```text
PPI/
  28-07/               # aplicación (fuente de verdad)
  DONA Y VISTE/        # copia histórica
  docs/                # manual, prototipo, diagrama
  supabase/            # migraciones SQL
  .github/workflows/   # deploy a Pages
```

## Contribución

1. Branch desde `main` (`feat/`, `fix/`, `chore/`).
2. Trabaja en `28-07/`.
3. No commitear `.env`.
4. Probar `npm run lint` y `npm run build`.
5. PR con descripción si cambia la UI.
