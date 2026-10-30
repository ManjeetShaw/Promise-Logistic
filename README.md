# Promise Logistics — Jute Catalogue (Frontend + Backend)

```
promise-logistics/
├─ frontend/   React + Vite website (deploy to Netlify / Vercel / Cloudflare Pages)
└─ backend/    Node + Express API that saves enquiries to MongoDB (deploy to Render / Railway)
```
The two parts are independent: they only talk through the enquiry form's request to `POST /api/enquiries`.

## Run locally (two terminals)

**1. Backend**
```
cd backend
npm install
copy .env.example .env        (Mac/Linux: cp .env.example .env)
```
Open `backend/.env` and set `MONGODB_URI` (MongoDB Atlas connection string ending in `/promise`) and `ADMIN_KEY`. Then:
```
npm run dev
```
You should see `MongoDB connected` and `API running on port 5000`.

**2. Frontend**
```
cd frontend
npm install
copy .env.example .env        (Mac/Linux: cp .env.example .env)
npm run dev
```
Open the printed address (usually http://localhost:5173).

## Where to edit
- Products: `frontend/src/data/products.js` (photos go in `frontend/public/images/`)
- Phone, email, address, hours, GST: `frontend/src/data/company.js`
- Map: `MAP_EMBED_URL` in `frontend/src/components/LocationMap.jsx`
- Hero photo: `HERO_IMAGE` in `frontend/src/data/products.js`

## Deploy

**A. Database** — MongoDB Atlas (free M0): create a database user, allow network access (0.0.0.0/0 for hosted backends), copy the connection string.

**B. Backend (Render example)**
- New → Web Service → connect your repo → **Root Directory: `backend`**
- Build command: `npm install` · Start command: `npm start`
- Environment variables: `MONGODB_URI`, `ADMIN_KEY`, `CLIENT_ORIGIN` (your website address, e.g. `https://yoursite.netlify.app`), `NODE_ENV=production`
- After deploy, open `https://YOUR-BACKEND/health` — it should show `{"ok":true}`.

**C. Frontend (Netlify / Vercel example)**
- Base/Root directory: `frontend` · Build command: `npm run build` · Publish/Output directory: `dist`
- Environment variable: `VITE_API_URL` = your backend address (no trailing slash), e.g. `https://yourapi.onrender.com`
- Redeploy after changing it (Vite reads it at build time).

**D. Final check** — submit the enquiry form on the live site; the enquiry should appear in Atlas → Browse Collections → `promise` → `enquiries`.

## Reading saved enquiries
`GET https://YOUR-BACKEND/api/enquiries` with header `x-admin-key: <your ADMIN_KEY>` (use Postman/Insomnia or Atlas's collection view).

## Notes
- Never commit or share `backend/.env`.
- Free Render services sleep when idle; the first enquiry after a quiet period can take ~30–60 seconds.
- The CORS list (`CLIENT_ORIGIN`) must exactly match your website address, including `https://`.
- Prices/specs in the catalogue are sample values; replace them before sending to customers.
