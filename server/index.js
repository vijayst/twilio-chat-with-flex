
import express from 'express';
import dotenv from 'dotenv';
import generateAccessToken from './generateAccessToken';
import createChannel from './createChannel';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/token', async (req, res) => res.send(await generateAccessToken()));
app.post('/channel', async (req, res) => res.send(await createChannel(req.body.identity, req.body.displayName)));

app.listen(4000, () => {
    console.log(`Server ready at http://localhost:4000`);
});

