import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/Motorcycle.Service';

describe('Motorcyvle Route', function () {
  it('verify function register', async function () {
    const motorcycle: IMotorcycle = {
      model: 'Honda cb300',
      year: 2015,
      color: 'Black',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const motorcycleOutput = new Motorcycle({ ...motorcycle, id: '1' });
    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const sut = new MotorcycleService();
    const result = await sut.register(motorcycle);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });
  it('verify function list', async function () {
    const motorcycles: IMotorcycle[] = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Honda Cb300',
        year: 2015,
        color: 'Black',
        status: true,
        buyValue: 20.000,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Honda cb150',
        year: 2011,
        color: 'Blue',
        status: true,
        buyValue: 29.000,
        category: 'Street',
        engineCapacity: 1000,
      },
    ];
    sinon.stub(Model, 'find').resolves(motorcycles);

    const sut = new MotorcycleService();
    const result = await sut.list();

    expect(result).to.be.deep.equal(motorcycles);
  });
  it('verify function findById', async function () {
    const bike: IMotorcycle = {
      id: '634852326b35b59438fbea2f',
      model: 'Honda Cb300',
      year: 2015,
      color: 'Black',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    sinon.stub(Model, 'findOne').resolves(bike);

    const sut = new MotorcycleService();
    const result = await sut.findById('634852326b35b59438fbea2f');

    expect(result).to.be.deep.equal(bike);
  });
  it('verify function updateOne', async function () {
    const newMotorcycle: IMotorcycle = {
      id: '634852326b35b59438fbea2f',
      model: 'Honda Cb300 Hornet',
      year: 2015,
      color: 'Black',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
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

    const sut = new MotorcycleService();
    const result = await sut.updateOne('634852326b35b59438fbea2f', newMotorcycle);
      
    expect(result).to.be.deep.equal(newMotorcycle);
  });

  afterEach(function () { sinon.restore(); });
});