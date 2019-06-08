
import express from 'express';
import dotenv from 'dotenv';
import generateAccessToken from './generateAccessToken';
import generateAccessToken2 from './generateAccessToken2';
import createChannel from './createChannel';
import createChannel2 from './createChannel2';
import createChannel3 from './createChannel3';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/token', (req, res) => res.send(generateAccessToken(req.body.identity)));
app.post('/token2', async (req, res) => res.send(await generateAccessToken2()));
app.post('/channel', async (req, res) => res.send(await createChannel(req.body.displayName)));
app.post('/channel2', async (req, res) => res.send(await createChannel2(req.body.identity, req.body.displayName)));
app.post('/channel3', async (req, res) => res.send(await createChannel3(req.body.displayName)));

app.listen(4000, () => {
    console.log(`Server ready at http://localhost:4000`);
});

