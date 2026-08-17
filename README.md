# Express + MySQL + Prisma

- npm init -y
- git init
- cai dat express: `npm install express`
- tao `.gitignore`
- them:
  - `node_modules/`
  - `.env`
- cai dotenv: `npm install dotenv`
- cai nodemon: `npm install --save-dev nodemon`
- them `"type": "module"` vao `package.json`

---

- tao file `src/server.js`
- cau hinh express
- port: `3333`
- them `app.use(express.json())`
- run: `npm run dev`
- test server bang POSTMAN

---

- cai dat prisma:
  - `npm install prisma@6 --save-dev`
  - `npm install @prisma/client@6`
- khoi tao prisma:
  - `npx prisma init --datasource-provider mysql`
- kiem tra version:
  - `npx prisma -v`
- version:
  - prisma: `6.19.3`
  - @prisma/client: `6.19.3`
- tao db: `express_prisma_shop`
- cau hinh `.env`:
  - `DATABASE_URL="mysql://root:@127.0.0.1:3306/express_prisma_shop"`
- test cau hinh prisma:
  - `npx prisma validate`
  - `npx prisma format`

---

- implement schema database
- Category:
  - id
  - name
  - status: ACTIVE / INACTIVE
- Product:
  - id
  - name
  - price
- Category - Product quan he N-N
- tao bang trung gian `CategoryProduct`
- kiem tra:
  - `npx prisma format`
  - `npx prisma validate`
- migration:
  - `npx prisma migrate dev --name init`
- generate prisma client:
  - `npx prisma generate`

---

- ket noi prisma client voi express
- tao `src/lib/prisma.js`
- implement PrismaClient

---

- POST Category
- implement `category.controller.js`
- implement `category.route.js`
- sua `server.js`
- test:
  - `POST /api/categories`

---

- GET Category
- impl `getCategories`
- test:
  - `GET /api/categories`

---

- Search Category
- impl search bang query
- test:
  - `GET /api/categories?search=lap`

---

- GET Category by ID
- impl `getCategoryById`
- test:
  - `GET /api/categories/:id`

---

- PUT Category
- update:
  - name
  - status
- test:
  - `PUT /api/categories/:id`

---

- DELETE Category
- test:
  - `DELETE /api/categories/:id`

---

- POST Product
- implement `product.controller.js`
- implement `product.route.js`
- them product voi:
  - name
  - price
  - categoryIds
- test:
  - `POST /api/products`

---

- GET Product
- impl `getProducts`
- test:
  - `GET /api/products`

---

- GET Product by ID
- impl `getProductById`
- test:
  - `GET /api/products/:id`

---

- Search Product
- search theo name
- test:
  - `GET /api/products?search=iphone`

---

- Pagination Product
- dung:
  - page
  - limit
  - skip
  - take
- cong thuc:
  - `skip = (page - 1) * limit`
- test:
  - `GET /api/products?page=1&limit=5`

---

- Search + Pagination Product
- test:
  - `GET /api/products?search=iphone&page=1&limit=5`

---

- PUT Product
- update:
  - name
  - price
  - categoryIds
- cap nhat lai quan he N-N
- test:
  - `PUT /api/products/:id`

---

- DELETE Product
- test:
  - `DELETE /api/products/:id`

---

- test lai tat ca API bang POSTMAN

---

- Category API:
  - `POST /api/categories`
  - `GET /api/categories`
  - `GET /api/categories?search=...`
  - `GET /api/categories/:id`
  - `PUT /api/categories/:id`
  - `DELETE /api/categories/:id`

---

- Product API:
  - `POST /api/products`
  - `GET /api/products`
  - `GET /api/products/:id`
  - `GET /api/products?search=...`
  - `GET /api/products?page=1&limit=5`
  - `GET /api/products?search=...&page=1&limit=5`
  - `PUT /api/products/:id`
  - `DELETE /api/products/:id`

---

- sau moi buoc:
  - `git status`
  - `git add .`
  - `git commit -m "noi dung buoc vua lam"`
  - `git push`

---

- kiem tra truoc khi nop:
  - `.env` khong bi push
  - `node_modules` khong bi push
  - migration co trong git
  - schema prisma co trong git
  - Category CRUD chay du
  - Product CRUD chay du
  - search Category chay
  - search Product chay
  - pagination Product chay
  - quan he Category - Product N-N chay
  - test API bang POSTMAN
  - push code len github
