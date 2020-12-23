const mongoose = require("mongoose");
const Cube = require("olap-cube-js");
const User = require('../models/users');
const { generateDimensions, addMeasuresId, checkIsValueAndSet, checkIfIsAccess } = require("../utils");
const Schema = mongoose.Schema;

const dimensionsSchema = new Schema({}, { strict: false });

const businessData = mongoose.model("businessData", dimensionsSchema);

const regions = [
  "Grodno",
  "Minsk",
  "Brest",
  "Gomel",
  "Vitebsk",
  "Mogilev",
  "Moskou",
  "Paris",
  "Berlin",
  "Vena",
  "Amsterdam",
  "Bern",
  "London"
];

const products = [
  "Apple",
  "Phone",
  "Laptop",
  "Notebook",
  "Car"
];

const date = [
  "December",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November"
];

const marks = [
  "Samsung",
  "Apple",
  "Audi",
  "BMW",
  "Volkswagen",
  "Xiaomi"
];

const stores = [
  "Store 1",
  "Store 2",
  "Store 3",
  "Store 4",
  "Store 5",
  "Store 6",
]

const data = [];

const getRandomIntegerFromRange = (minValue, maxValue) => {
  return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
}

const generateData = () => {
  for (let index = 0; index < 10000; index++) {
    data.push({
      id: index,
      region: regions[getRandomIntegerFromRange(0, regions.length)],
      product: products[getRandomIntegerFromRange(0, products.length)],
      mark: marks[getRandomIntegerFromRange(0, marks.length)],
      date: date[getRandomIntegerFromRange(0, date.length)],
      stores: stores[getRandomIntegerFromRange(0, stores.length)],
      value: getRandomIntegerFromRange(0, 10000),
    });   
  }
}

const createData = async (requestData = [], valueParameter, userId) => {
  generateData();
  addMeasuresId(data);

  if (valueParameter) {
    checkIsValueAndSet(data, valueParameter); 
  }
  
  const id = mongoose.Types.ObjectId();

  await User.updateOne({_id : userId }, {$push: {data : id}});

  const dimensionHierarchies = generateDimensions(data[0]);
  const cube = new Cube({ dimensionHierarchies });
  cube.addFacts(data);

  return businessData.create({ cube, _id: id });
}

const addData = async (requestData, id, conditions, userId) => {
  generateData();

  const fixedId = { _id: id };
  addMeasuresId(data);
  
  if (conditions.value) {
    checkIsValueAndSet(data, conditions.value);
  }
  
  const [ databaseData ] = await businessData.find(fixedId);

  if (!databaseData) return "Нет таких данных";

  if (!checkIfIsAccess(userId, databaseData._doc._id)) return "Нет доступа или данных";

  const facts = new Cube(databaseData._doc.cube).getFacts();
  data.forEach((element) => facts.push(element));

  const dimensionHierarchies = generateDimensions(facts[0]);
  const updatedCube = new Cube({ dimensionHierarchies });
  updatedCube.addFacts(facts);

  await businessData.deleteOne(fixedId);
  return businessData.create({ cube: updatedCube, _id: id });  
}

const getMeasure = async (cubeId, userId) => {
  const fixedId = { _id: cubeId };
  const [ databaseData ] = await businessData.find(fixedId);

  if (!databaseData) return "Нет таких данных";
  
  const isAvailable = await checkIfIsAccess(userId, databaseData._doc._id);

  if (!isAvailable) return "Нет доступа";

  return databaseData._doc.cube.dimensionHierarchies.map((element) => {
    return element.dimensionTable.dimension;
  });
}

const getData = async (conditions, cubeId, userId) => {
  const conditionsObject = {};

  const fixedId = { _id: cubeId };
  const [ databaseData ] = await businessData.find(fixedId);

  if (!databaseData) return "Нет таких данных";
  
  const isAvailable = await checkIfIsAccess(userId, databaseData._doc._id);

  if (!isAvailable) return "Нет доступа";
  
  const cube = new Cube(databaseData._doc.cube);

  const params = Object.keys(conditions);

  params.forEach((element) => {
    const members = cube.getDimensionMembers(element);
    const result = members.find((item) => item[element] === conditions[element]);
    conditionsObject[element] = result;
  });

  return cube.dice(conditionsObject).getFacts();
}

const getIdAllCubes = async (userId) => {
  const [user] = await User.find({ _id: userId });

  return user._doc.data;
}

const updateFullDocument = async (conditions, updatedData, userId) => {
  const fixedId = { _id: conditions.id };
  const [ databaseData ] = await businessData.find(fixedId);

  if (!databaseData) return "Нет таких данных";
  
  const isAvailable = await checkIfIsAccess(userId, databaseData._doc._id);

  if (!isAvailable) return "Нет доступа";

  addMeasuresId(updatedData);
  checkIsValueAndSet(updatedData, conditions.value);

  const dimensionHierarchies = generateDimensions(updatedData[0]);
  const cube = new Cube({ dimensionHierarchies });
  cube.addFacts(updatedData);
  
  await businessData.deleteOne(fixedId);
  return businessData.create({ cube, _id: conditions.id });
}

const updateMeasuresMember = async (conditions, userId) => {
  const fixedId = { _id: conditions.id };
  const [ databaseData ] = await businessData.find(fixedId);

  if (!databaseData) return "Нет таких данных";
  
  const isAvailable = await checkIfIsAccess(userId, databaseData._doc._id);

  if (!isAvailable) return "Нет доступа";

  const cube = new Cube(databaseData._doc.cube);
  const members = cube.getDimensionMembers(conditions.measure);
  const result = members.findIndex((item) => item[conditions.measure] === conditions.oldMember);
  const member = members[result];
  member[conditions.measure] = conditions.newMember; 

  await businessData.deleteOne(fixedId);
  return businessData.create({ cube, _id: conditions.id });
}

const deleteData = async (conditions, facts, userId) => {
  const fixedId = { _id: conditions.id };
  const fixedUserId = { _id: userId };
  const [ databaseData ] = await businessData.find(fixedId);
  
  if (!databaseData) return "Нет таких данных";
  
  const isAvailable = await checkIfIsAccess(userId, databaseData._doc._id);

  if (!isAvailable) return "Нет доступа";

  if (!facts) {
    const [ user ] = await User.find(fixedUserId);
    user._doc.data.pull(conditions.id);
    const newUser = user._doc;

    await User.deleteOne(fixedUserId);
    await User.create(newUser);
    return businessData.deleteOne(fixedId);
  }

  const cube = new Cube(databaseData._doc.cube);
  
  cube.removeFacts(facts);
  await businessData.deleteOne(fixedId);
  return await businessData.create({ cube, _id: conditions.id });
}

module.exports = {
  createData,
  addData,
  getMeasure,
  getData,
  getIdAllCubes,
  updateFullDocument,
  updateMeasuresMember,
  deleteData
}
