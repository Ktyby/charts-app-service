const mongoose = require("mongoose");
const OlapCubes = require("olap-cube-js");
const { generateDimensions, addMeasuresId, checkIsValueAndSet } = require("../utils");
const Schema = mongoose.Schema;

const dimensionsSchema = new Schema({}, { strict: false });

const businessData = mongoose.model("businessData", dimensionsSchema);

const createData = (data = [], valueParameter) => {
  addMeasuresId(data);
  checkIsValueAndSet(data, valueParameter);

  const dimensions = generateDimensions(data[0]);
  const cube = new OlapCubes({ dimensions });
  
  cube.addFacts(data);
  
  return businessData.create({ cube });
}

const addData = async (data, id, conditions) => {
  const fixedId = { _id: id };
  delete fixedId.id;

  addMeasuresId(data);
  checkIsValueAndSet(data, conditions.value);
  
  const [ databaseData ] = await businessData.find(fixedId);
  const updatedCube = await new OlapCubes(databaseData._doc.cube).addFacts(data);

  await businessData.deleteOne(fixedId);

  return await businessData.create({ cube: updatedCube, _id: id });
}

const getData = (conditions) => {
  const fixedCondition = { ...conditions, _id: conditions.id };
  delete fixedCondition.id;
  return businessData.find(fixedCondition);
}

const updateData = (conditions, updatedData) => {
  console.log(conditions, updatedData);
  const fixedCondition = { ...conditions, _id: conditions.id };
  delete fixedCondition.id;
  return businessData.updateMany(fixedCondition, updatedData);
}

const deleteData = (conditions) => {
  const fixedCondition = { ...conditions, _id: conditions.id };
  delete fixedCondition.id;
  return businessData.deleteOne(fixedCondition);
}

module.exports = {
  createData,
  addData,
  getData,
  updateData,
  deleteData
}
