# Zapata-Express-API

Back end repository for Zapata Corporation, made by One Unit

Clone this repository:

```
git clone https://github.com/EmilioPadilla/Zapata-Express-API.git
```

Install npm dependencies:
```
yarn
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


```
npm run migrateAndSeed
```


### 3. Start the REST API server

```
yarn start
```

The server is now running on `http://localhost:1337`. You can send the API requests implemented in `index.js`, e.g. [`http://localhost:1337`](http://localhost:1337).
