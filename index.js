const express = require('express');
const pg = require('pg');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

const client = new pg.Client(process.env.DATABASE_URL);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
