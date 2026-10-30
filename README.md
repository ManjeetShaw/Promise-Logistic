# Promise-Logistic
Responsive jute product catalogue with enquiry form, built with React, Express and MongoDB.
# Promise Logistics — Jute Product Catalogue

A responsive product catalogue and enquiry website for **Promise Logistics**, a supplier of jute bags.
Visitors can browse products, view photos and details, and send an enquiry that is saved to MongoDB.

## Features

- Interactive catalogue: select a product from a scrollable list to update the large featured view
- Photo gallery per product, with optional drag-to-rotate for products that have a real turntable photo sequence
- Enquiry form with validation; choosing "Enquire" on a product preselects it in the form
- Enquiry saved to MongoDB, including the product ID and name
- Scroll-animated footer that fades in and out with scroll position (respects reduced-motion settings)
- Google Maps embed section (placeholder until a business address is added)
- Fully responsive for desktop, tablet and mobile
- Backend protection: rate limiting, CORS allow-list, security headers, input validation

## Tech Stack

| Part | Technology |
|---|---|
| Frontend | React, Vite, lucide-react, plain CSS |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB Atlas |

## Project Structure

```
promise-logistics/
├─ frontend/                React + Vite website
│  ├─ public/images/        Product and footer photos
│  └─ src/
│     ├─ components/        Navbar, Hero, ProductCatalogue, EnquiryForm, Footer, ...
│     └─ data/              products.js (catalogue) and company.js (contact details)
└─ backend/                 Express API
   └─ src/
      ├─ models/Enquiry.js
      ├─ routes/enquiries.js
      ├─ app.js
      └─ server.js
```

## Getting Started

You need [Node.js](https://nodejs.org) (v18 or newer) and a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster.

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env      # Windows: copy .env.example .env
```

Edit `backend/.env`:

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string, ending in `/promise` |
| `PORT` | API port (default `5000`) |
| `CLIENT_ORIGIN` | Website address allowed to call the API, e.g. `http://localhost:5173` |
| `ADMIN_KEY` | Secret used to read saved enquiries |

Generate a random secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Start the API:

```bash
npm run dev
```

### 2. Frontend

Open a second terminal:

```bash
cd frontend
npm install
cp .env.example .env      # Windows: copy .env.example .env
npm run dev
```

Open the address shown in the terminal (usually http://localhost:5173).

## Customising

| What | Where |
|---|---|
| Products, prices, specs, photos | `frontend/src/data/products.js` (photos go in `frontend/public/images/`) |
| Phone, email, address, hours, GST | `frontend/src/data/company.js` |
| Google Maps location | `MAP_EMBED_URL` in `frontend/src/components/LocationMap.jsx` |
| Hero background photo | `HERO_IMAGE` in `frontend/src/data/products.js` |
| Footer background | `frontend/public/images/footer-jute-bg.webp` |

> Prices, dimensions and material specifications in the catalogue are **sample values**. Replace them with verified information before sharing the site with customers.

## API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `POST` | `/api/enquiries` | Save an enquiry (public, rate-limited) |
| `GET` | `/api/enquiries` | List saved enquiries (requires `x-admin-key` header) |

Example enquiry body:

```json
{
  "name": "Jane Doe",
  "company": "Acme Ltd",
  "email": "jane@example.com",
  "phone": "9876543210",
  "product": "PL-JB-001",
  "productName": "Standard Jute Shopping Bag",
  "quantity": 500,
  "message": "Need a custom print."
}
```

## Deployment

**Database:** create a MongoDB Atlas cluster, a database user, allow network access, and copy the connection string.

**Backend (e.g. Render, Railway)**
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables: `MONGODB_URI`, `ADMIN_KEY`, `CLIENT_ORIGIN` (your live website address, including `https://`), `NODE_ENV=production`
- Check `https://YOUR-BACKEND/health` returns `{"ok":true}`

**Frontend (e.g. Netlify, Vercel)**
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL` set to your backend address (no trailing slash)
- Redeploy after changing environment variables, since Vite reads them at build time

## Notes

- Never commit `.env` files. They are listed in `.gitignore`.
- Free hosting tiers may sleep when idle, so the first enquiry after a quiet period can be slow.
- `CLIENT_ORIGIN` must exactly match the website address, otherwise browsers will block the enquiry form.
- Product photos should be your own. Do not publish images that carry other companies' branding.

## License

All rights reserved © Promise Logistics. Add a license here if you want to open-source the project.
