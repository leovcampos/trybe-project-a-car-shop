import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcyleService {
  private domainMotocycle(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }

    return null;
  }

  public async register(motorcycle: IMotorcycle): Promise<Motorcycle | null> {
    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.create(motorcycle);
    return this.domainMotocycle(result);
  }

  public async list(): Promise<(Motorcycle | null)[]> {
    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.find();
    return result.map((motorcycle) => this.domainMotocycle(motorcycle));
  }

  public async findById(id: string): Promise<Motorcycle | null> {
    const motorcycleODM = new MotorcycleODM();
    const result = await motorcycleODM.findById(id);
    return this.domainMotocycle(result);
  }

  public async updateOne(id: string, newInfos: IMotorcycle): Promise<Motorcycle | null> {
    const motorcycleODM = new MotorcycleODM();
    const verifyMotorcycle = await motorcycleODM.findById(id);
    if (!verifyMotorcycle) {
      return null;
    }

    const result = await motorcycleODM.update(id, newInfos);
    return this.domainMotocycle(result);
  }
}