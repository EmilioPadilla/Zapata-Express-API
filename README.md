# Zapata-Express-API

Back end repository for Zapata Corporation, made by One Unit

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/javascript/rest-express
npm install 
```
or 
```
cd prisma-examples/javascript/rest-express
yarn install 
```
and also run this line
```
npx prisma migrate dev --name init
```
also make sure you have the .env on your root file
```
DB_URL=postgresql://db_user:db_password@db_host:db_port/db_name
JWT_SECRET=some_secret
SALTROUNDS=10
```
</details>

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.js`](./prisma/seed.js) will be executed and your database will be populated with the sample data.

### 3. Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can send the API requests implemented in `index.js`, e.g. [`http://localhost:3000/feed`](http://localhost:3000/feed).
