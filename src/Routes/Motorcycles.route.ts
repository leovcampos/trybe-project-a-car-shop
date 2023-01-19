import { Router } from 'express';
import MotorcycleController from '../Controllers/Motorcycle.Controller';

const motorcycles = Router();

motorcycles.post('/', (req, res, next) => new MotorcycleController(req, res, next).register());

motorcycles.get('/', (req, res, next) => new MotorcycleController(req, res, next).findAll());

motorcycles.get('/:id', (req, res, next) => new MotorcycleController(req, res, next).findById());

motorcycles.put('/:id', (req, res, next) => new MotorcycleController(req, res, next).updateOne());

export default motorcycles;
