
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.get('/token', (req, res) => res.send('Hello world'))

app.listen(3000, () => {
    console.log(`Server ready at http://localhost:3000`);
});

