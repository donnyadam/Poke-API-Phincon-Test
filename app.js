import express from 'express';
import bodyParser from 'body-parser';
import catchRouter from './routes/catch.js';
import releaseRouter from './routes/release.js';
import renameRouter from './routes/rename.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/catch', catchRouter);
app.use('/release', releaseRouter);
app.use('/rename', renameRouter);

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});