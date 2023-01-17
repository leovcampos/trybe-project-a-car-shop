import Car from '../Domains/Car';
import CarODM from '../Models/CarODM';
import ICar from '../Interfaces/ICar';

export default class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }

    return null;
  }

  public async register(car: ICar): Promise<Car | null> {
    const carODM = new CarODM();
    const result = await carODM.create(car);
    const newCar = this.createCarDomain(result);
    return newCar;
  }

  public async list(): Promise<(Car | null)[]> {
    const carODM = new CarODM();
    const result = await carODM.find();
    return result.map((car) => this.createCarDomain(car));
  }

  public async findById(id: string): Promise<Car | null> {
    const carODM = new CarODM();
    const result = await carODM.findById(id);
    return this.createCarDomain(result);
  }

  public async update(id: string, carUpdated: ICar): Promise<Car | null> {
    const carODM = new CarODM();
    const carToUpdate = await carODM.findById(id);
    if (!carToUpdate) return null;

    const result = await carODM.update(id, carUpdated);
    return this.createCarDomain(result);
  }
}