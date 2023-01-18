import { Router } from 'express';
import CarController from '../Controllers/Car.Controller';

const cars = Router();

cars.post('/', (req, res, next) => new CarController(req, res, next).register());

cars.get('/', (req, res, next) => new CarController(req, res, next).list());

cars.get('/:id', (req, res, next) => new CarController(req, res, next).findById());

cars.put('/:id', (req, res, next) => new CarController(req, res, next).update());

export default cars;