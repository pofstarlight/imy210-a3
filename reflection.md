# IMY 210 — Assignment 3 Reflection

**Name:** [Your Name]  
**Student Number:** [Your Student Number]  
**GitHub Repo:** [https://github.com/YOURUSERNAME/imy210-a3]

---

## Reflection

[Write 200–300 words here describing your experience. Cover:]
- [What Docker is and how it felt to use it for the first time]
- [What Strapi is and how setting up content types worked]
- [Challenges you faced — e.g. CORS errors, API response structure, Dockerfile issues]
- [What you learned overall]

---

## Commands to Run the Project

### Prerequisites
- Docker installed and running
- Node.js 20+

### Run Strapi (Backend)

```bash
cd backend
docker build -t strapi-blog .
docker run -p 1337:1337 strapi-blog
```

Strapi will be available at: http://localhost:1337

### Run Nuxt (Frontend)

```bash
cd frontend
docker build -t nuxt-blog .
docker run -p 3000:3000 -e NUXT_PUBLIC_STRAPI_URL=http://host.docker.internal:1337 nuxt-blog
```

Frontend will be available at: http://localhost:3000

> **Note:** When running both in Docker, use `http://host.docker.internal:1337` as the Strapi URL so the Nuxt container can reach the Strapi container on your machine.

### Run Locally (without Docker)

```bash
# Terminal 1 — Strapi
cd backend
npm run develop

# Terminal 2 — Nuxt
cd frontend
npm run dev
```