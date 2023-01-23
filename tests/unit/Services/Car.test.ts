import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/Car.Service';

describe('route /cars tests', function () {
  it('verify function register', async function () {
    const car: ICar = {
      model: 'Fusca',
      year: 1980,
      color: 'Blue',
      status: true,
      buyValue: 20.990,
      doorsQty: 2,
      seatsQty: 5,
    };
    const carRegister = new Car({ id: '1', ...car });
    sinon.stub(Model, 'create').resolves(carRegister);

    const sut = new CarService();
    const result = await sut.register(car);

    expect(result).to.be.deep.equal(carRegister);
  });

  it('verify function list all cars', async function () {
    const cars: ICar[] = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Fusca',
        year: 1980,
        color: 'Blue',
        status: true,
        buyValue: 20.990,
        doorsQty: 2,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Gol',
        year: 1995,
        color: 'Black',
        buyValue: 30,
        status: false,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];
    sinon.stub(Model, 'find').resolves(cars);

    const sut = new CarService();
    const result = await sut.list();

    expect(result).to.be.deep.equal(cars);
  });

  it('verify function findById', async function () {
    const car: ICar = {
      id: '634852326b35b59438fbea2f',
      model: 'Fusca',
      year: 1980,
      color: 'Blue',
      status: true,
      buyValue: 20.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    sinon.stub(Model, 'findOne').resolves(car);

    const sut = new CarService();
    const result = await sut.findById('634852326b35b59438fbea2f');

    expect(result).to.be.deep.equal(car);
  });

  it('if cant find a car with wrong ID', async function () {
    sinon.stub(Model, 'findOne').resolves(null);

    const sut = new CarService();
    const result = await sut.findById('634852326b35b59438fbea2f');

    expect(result).to.be.deep.equal(null);
  });

  it('verify function update', async function () {
    const newCar: ICar = {
      id: '634852326b35b59438fbea2f',
      model: 'Fusca',
      year: 1980,
      color: 'Blue',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    sinon.stub(Model, 'findOne').resolves(true);
    sinon.stub(Model, 'updateOne').resolves(
      { acknowledged: true, 
        matchedCount: 1, 
        modifiedCount: 1, 
        upsertedCount: 0, 
        upsertedId: new ObjectId('634852326b35b59438fbea2f'),
      },
    );

    const sut = new CarService();
    const result = await sut.update('634852326b35b59438fbea2f', newCar);

    expect(result).to.be.deep.equal(newCar);
  });

  afterEach(function () { sinon.restore(); });
});
