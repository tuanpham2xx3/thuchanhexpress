- npm init -y
- git init
- cai dạt npm install express
- tao git ignore
- npm install dotenv
- npm install --save-dev nodemon

---

- tao file server.js
- npm run dev
- test POSTMAN

---

- cai dat va cau hinh prisma : npm install prisma@6 --save-dev
- npm install @prisma/client@6
- kiem tra : npx prisma , -v : prisma: 6.19.3 , @prisma/client : 6.19.3
- tao db: express_prisma_shop
- sua env mysql://root:@127.0.0.1:3306/express_prisma_shop
- test cau hinh prisma : npx prisma validate , npx prisma format

---

- implement schema database
- kiem tra : npx prisma format , npx prisma validate
- run npx prisma migrate dev --name init

---

- ket noi prisma client voi express
- implement prisma.js

---

- POST Category
- implement category controller
- impl category route
- sua server.js

---
- Search Category
- impl getCategory
---
- Get by ID category

---
- PUT category

---
- DELETE category

---



