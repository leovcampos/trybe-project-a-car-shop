import express from 'express';
import cars from './Routes/Cars.route';

const app = express();

app.use(express.json());
app.use('/cars', cars);

export default app;
