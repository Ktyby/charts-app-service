const mongoose = require("mongoose");
const Cube = require("olap-cube-js");
const { generateDimensions, addMeasuresId, checkIsValueAndSet } = require("../utils");
const Schema = mongoose.Schema;

const dimensionsSchema = new Schema({}, { strict: false });

const businessData = mongoose.model("businessData", dimensionsSchema);

const createData = (data = [], valueParameter) => {
  addMeasuresId(data);
  checkIsValueAndSet(data, valueParameter); 

  const dimensionHierarchies = generateDimensions(data[0]);
  const cube = new Cube({ dimensionHierarchies });
  cube.addFacts(data);

  return businessData.create({ cube });
}

const addData = async (data, id, conditions) => {
  const fixedId = { _id: id };
  delete fixedId.id;

  addMeasuresId(data);
  checkIsValueAndSet(data, conditions.value);
  
  const [ databaseData ] = await businessData.find(fixedId);
  const updatedCube = await new Cube(databaseData._doc.cube).addFacts(data);

  await businessData.deleteOne(fixedId);

  return await businessData.create({ cube: updatedCube, _id: id });
}

const getData = async (conditions) => {
  const fixedId = { _id: conditions.id };

  const [ databaseData ] = await businessData.find(fixedId);
  const cube = await new Cube(databaseData._doc.cube);
  const member = await cube.getDimensionMembers(conditions.measure)[0];
  return subCube = await cube.slice(conditions.measure, member);

  // let firstMember = await cube.getDimensionMembers('date')[0]
  // let secondMember = await cube.getDimensionMembers('region')[0]
  // let subCube = await cube.dice({ date: firstMember, region: secondMember })
  // await console.log(subCube);

  // return await subCube;
}

const updateFullDocument = (conditions, updatedData) => {
  // const fixedCondition = { ...conditions, _id: conditions.id };
  // delete fixedCondition.id;

  const fixedId = { _id: conditions.id };

  addMeasuresId(updatedData);
  checkIsValueAndSet(updatedData, conditions.value);

  const dimensionHierarchies = generateDimensions(updatedData[0]);
  const cube = new Cube({ dimensionHierarchies });
  cube.addFacts(updatedData);

  return businessData.updateOne(fixedId, updatedData);
}

const updatePartDocument = (conditions, updatedData) => {
  const fixedCondition = { ...conditions, _id: conditions.id };
  delete fixedCondition.id;
  return businessData.updateMany(fixedCondition, updatedData);
}

const deleteData = async (conditions, facts) => {
  const fixedId = { _id: conditions.id };

  if (!facts) {
    return businessData.deleteOne(fixedId);
  }

  const [ databaseData ] = await businessData.find(fixedId);
  const cube = await new Cube(databaseData._doc.cube);
  await cube.removeFacts(facts);

  await businessData.deleteOne(fixedId);

  return await businessData.create({ cube, _id: conditions.id });
}

module.exports = {
  createData,
  addData,
  getData,
  updateFullDocument,
  updatePartDocument,
  deleteData
}
