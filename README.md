# Description

## To Run in Dev

1. Clone Project
2. Create a copy of .env and renamed as `.env.template` and change variables
3. Install Dependencies `npm install`
4. Create Database `docker compose up -d`
5. Run Prisma Migrations `npx prisma migrate dev`
6. Execute seed `npm run seed`
7. Run Project `npm run dev`

## Run in Prodd
