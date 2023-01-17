import IVehicle from '../Interfaces/IVehicle';

export default class Vehicle {
  protected _id: string | undefined;
  protected _model: string;
  protected _year: number;
  protected _color: string;
  protected _status: boolean | undefined;
  protected _buyValue: number;

  constructor(vehicle: IVehicle) {
    this._id = vehicle.id;
    this._model = vehicle.model;
    this._year = vehicle.year;
    this._color = vehicle.color;
    this._status = vehicle.status;
    this._buyValue = vehicle.buyValue;
  }
}