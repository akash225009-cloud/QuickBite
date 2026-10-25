# QuickBite - Food Ordering Website

QuickBite is a student web project with a React/Vite frontend and a Node.js/Express backend. The backend retrieves food catalogue records from MongoDB Atlas.

## Links
- **Hosted frontend:** https://akash225009-cloud.github.io/QuickBite/
- **GitHub repository:** https://github.com/akash225009-cloud/QuickBite
- **Render backend:** https://quickbite-backend-9ayh.onrender.com
- **Food catalogue API:** https://quickbite-backend-9ayh.onrender.com/foods

## Technology stack
- React 19 and Vite 8
- Node.js and Express 5
- Mongoose and MongoDB Atlas
- GitHub Pages / GitHub Actions for frontend hosting
- Render for backend hosting

## Project structure

```text
QuickBite/
├── .github/workflows/deploy.yml
├── client/
│   ├── src/App.jsx
│   ├── src/App.css
│   ├── src/index.css
│   ├── src/main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── index.js
│   ├── package.json
│   └── .env                # local only; do not commit
└── .gitignore
```

## Run locally

### Backend

1. Open a terminal in `server/`.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `server/.env` with your MongoDB Atlas URI:

   ```text
   MONGODB_URI=<your MongoDB Atlas connection string>
   ```

4. Start the server:

   ```bash
   npm start
   ```

The backend listens on `process.env.PORT` or port `5000` locally.

### Frontend

1. Open a second terminal in `client/`.
2. Install and run:

   ```bash
   npm install
   npm run dev
   ```

Use `http://localhost:5000` as the API base URL for local testing and the Render URL for the deployed frontend.

## API endpoints

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/` | Returns a backend running message. |
| `GET` | `/foods` | Returns the food catalogue as JSON. |
| `POST` | `/add-sample-foods` | Inserts four sample items only when the collection is empty. |

Example foods include Chicken Burger, Margherita Pizza, French Fries and Chicken Biryani.

## Deployment

### Render backend
- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Environment variable: `MONGODB_URI`

### GitHub Pages frontend
- Vite base path: `/QuickBite/`
- Build directory: `client/dist`
- Repository Settings > Pages source: GitHub Actions
- The workflow in `.github/workflows/deploy.yml` builds the `client` app and deploys `client/dist`.

## Important scope note

The backend endpoints documented here cover service status, menu retrieval and sample-data seeding. Do not claim that order persistence, online payment, authentication or delivery tracking is complete unless those features have been separately implemented in the backend and tested. Protect `.env` and never commit database credentials.
