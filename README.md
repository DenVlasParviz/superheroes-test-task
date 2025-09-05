# Superheroes

A full-stack web application (Vue.js + Node.js + PostgreSQL) built for a JavaScript Engineer test. It allows CRUD operations for a superheroes  with multiple images.

## Contents
- [Requirements](#requirements)
- [Environment Variables (.env)](#environment-variables-env)
- [Local Installation and Running](#local-installation-and-running)
- [Database Schema](#database-schema)
- [Assumptions](#assumptions)
- [Screenshots](#screenshots)

---

## Requirements

### Backend
- Node.js >= 16
- Express.js 
- PostgreSQL (database)
- Sequelize (ORM)

### Frontend
- Vue 3
- Vue Router
- Tailwind CSS
- Axios

## Environment Variables (.env)
Only on backend!
 `backend/.env`:
```
PORT=3000
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=superheroes_db
DB_HOST=localhost
DB_PORT=5432
BASE_URL=http://localhost:3000
```

## Local Installation and Running

- Install dependencies and run server and client in two separate terminals:
```bash
# backend
cd backend
npm install

# creates a database that is stored in config.js file
npm run migrate:create 

# migrates tables and demo superheroes
npm run migrate:push 

npm run dev

# frontend
cd frontend
npm install
npm run dev

#unit-test
cd frontend
npm run test
```
---
## Database Schema
---
```mermaid
erDiagram
    direction LR

    superheroes {
        int id 
        varchar nickname
        varchar real_name
        varchar origin_description
        varchar superpowers
        varchar catch_phrase
        }

    images {
        int id 
        int superhero_id 
        varchar url
        timestamp created_at
        timestamp updated_at
    }
   ```

**Database relation:**  
`superheroes.id (PK)` → `images.superhero_id (FK)`

## Assumptions
## Assumptions

- Images are stored in the public `uploads` folder and are deleted when a superhero is deleted or when some of its images are removed.
- Requests to modify or check an existing superhero are done by `nickname`, assuming that each superhero is unique.
- `nickname` is unique for each superhero.
- If a superhero has no images, the first letter of their nickname is displayed.
- Demo superheroes are created automatically during migration.
- Axios is used for API requests.
- Frontend uses Tailwind CSS;

## Screenshots
<img width="1915" height="941" alt="RvRvpnGui_3JyFqFax3I" src="https://github.com/user-attachments/assets/d898c145-3e23-41d7-b3d7-bbca9f913857" />
<img width="1463" height="929" alt="firefox_38eYhZxgbr" src="https://github.com/user-attachments/assets/61a840f4-d31b-4ad8-8e4c-eeac9e78b342" />
<img width="1366" height="948" alt="firefox_RQat64ESeJ" src="https://github.com/user-attachments/assets/1126ae7f-391a-4b5c-b79e-fcac5a6d9415" />
<img width="1353" height="943" alt="firefox_fkl4R5yeLf" src="https://github.com/user-attachments/assets/aff8a1c3-e1bf-48dc-8961-3ddec0aafeb5" />

