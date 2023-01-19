import express from 'express';
import cars from './Routes/Cars.route';
import motorcycles from './Routes/Motorcycles.route';

const app = express();

app.use(express.json());
app.use('/cars', cars);
app.use('/motorcycles', motorcycles);

export default app;
