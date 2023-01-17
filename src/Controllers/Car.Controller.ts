import { Request, Response, NextFunction } from 'express';
import CarService from '../Services/Car.Service';
import ICar from '../Interfaces/ICar';

export default class CarController {
  private _req: Request;
  private _res: Response;
  private _next: NextFunction;
  private _service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this._req = req;
    this._res = res;
    this._next = next;
    this._service = new CarService();
  }

  public async register() {
    const car: ICar = {
      model: this._req.body.model,
      year: this._req.body.year,
      color: this._req.body.color,
      status: this._req.body.status || false,
      buyValue: this._req.body.buyValue,
      doorsQty: this._req.body.doorsQty,
      seatsQty: this._req.body.seatsQty,
    };
    try {
      const newCar = await this._service.register(car);
      return this._res.status(201).json(newCar);
    } catch (error) {
      this._next(error);
    }
  }

  public async list() {
    try {
      const car = await this._service.list();
      return this._res.status(200).json(car);
    } catch (error) {
      this._next(error);
    }
  }
}