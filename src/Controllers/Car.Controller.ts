import { Request, Response, NextFunction } from 'express';
import CarService from '../Services/Car.Service';
import ICar from '../Interfaces/ICar';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async register() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };
    try {
      const newCar = await this.service.register(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async list() {
    try {
      const car = await this.service.list();
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById() {
    const { id } = this.req.params;

    if (id.length !== 24) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }

    try {
      const car = await this.service.findById(id);

      if (!car) {
        return this.res.status(404).json({ message: 'Car not found' });
      }
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const { id } = this.req.params;

    if (id.length !== 24) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }

    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };
    try {
      const updateCar = await this.service.update(id, car);
      if (!updateCar) {
        return this.res.status(404).json({ message: 'Car not found' });
      }

      return this.res.status(200).json(updateCar);
    } catch (error) {
      this.next(error);
    }
  }
}