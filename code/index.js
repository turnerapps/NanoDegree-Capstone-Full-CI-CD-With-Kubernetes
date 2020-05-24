//import moment from 'moment';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (_req, res) => {
    res.json({ message: 'You found the REST Api Homepage.' });
});

app.use((req, res) => {
    res.status(404).json({ message: '404 Error', details: `${req.method} on ${req.url} not valid.` });
});

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`);
});