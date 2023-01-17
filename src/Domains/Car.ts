import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

export default class CAr extends Vehicle {
  private _doorsQty: number;
  private _seatsQty: number;

  constructor(car: ICar) {
    super(car);
    this._doorsQty = car.doorsQty;
    this._seatsQty = car.seatsQty;
  }
}