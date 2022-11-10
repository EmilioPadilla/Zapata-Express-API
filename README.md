# Zapata-Express-API

Back end repository for Zapata Corporation, made by One Unit

Clone this repository:

```
git clone https://github.com/EmilioPadilla/Zapata-Express-API.git
```

Install npm dependencies:

```
npm install
```

or

```
yarn
```

and also run this line

```
npm run migrateAndSeed
```

also make sure you have the .env on your root file

```
DB_URL=postgresql://usr:pwd@localhost/zapata_database
JWT_SECRET=some_secret
JWT_ALGORITHM='HS256'
SALTROUNDS=0
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

The server is now running on `http://localhost:1337`. You can send the API requests implemented in `index.js`, e.g. [`http://localhost:1337`](http://localhost:1337).
