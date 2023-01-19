import { Request, Response, NextFunction } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcyleService from '../Services/Motorcycle.Service';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcyleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcyleService();
  }

  public async register() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const motorcycleRegister = await this.service.register(motorcycle);
      return this.res.status(201).json(motorcycleRegister);
    } catch (error) {
      this.next(error);
    }
  }

  public async findAll() {
    try {
      const motorcycles = await this.service.list();
      return this.res.status(200).json(motorcycles);
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
      const motorcycleById = await this.service.findById(id);
      if (!motorcycleById) {
        return this.res.status(404).json({ message: 'Motorcycle not found' });
      }

      return this.res.status(200).json(motorcycleById);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateOne() {
    const { id } = this.req.params;
    if (id.length !== 24) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }

    const motorcycleUpdated: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const motorcycleUpdate = await this.service.updateOne(id, motorcycleUpdated);
      if (!motorcycleUpdate) {
        return this.res.status(404).json({ message: 'Motorcycle not found' });
      }

      return this.res.status(200).json(motorcycleUpdate);
    } catch (error) {
      this.next(error);
    }
  }
}
