const mongoose = require("mongoose");
const olapCubes = require("olap-cube-js");
const { generateDimensions } = require("../utils");
const Schema = mongoose.Schema;

const dimensionsSchema = new Schema({ _id: String }, { strict: false });

const businessData = mongoose.model("businessData", dimensionsSchema);

const createData = (data = {}, id) => {
  const dimensions = generateDimensions(data[0]);
  const cube = new olapCubes({ dimensions });
  
  cube.addFacts(data);

  cube._id = id;
  return businessData.create(cube);
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
  getData,
  updateData,
  deleteData
}
