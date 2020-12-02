const mongoose = require("mongoose");
const olapCubes = require("olap-cube-js");
const Schema = mongoose.Schema;

const dimensions = [
  {
    dimensionTable: {
      dimension: 'regions',
      keyProps: ['region'],
    }
  },
  {
    dimensionTable: {
      dimension: 'year',
      keyProps: ['year']
    }
  },  
  {
    dimensionTable: {
      dimension: 'month',
      keyProps: ['month']
    }
  },
  {
    dimensionTable: {
      dimension: 'products',
      keyProps: ['product'],
    }
  }
];

const cube = new olapCubes({ dimensions });
const dimensionsSchema = new Schema({ _id: String }, { strict: false });

const businessData = mongoose.model("businessData", dimensionsSchema);

const createData = (data = {}, id) => {
  data._id = id;
  return businessData.create(data);
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
