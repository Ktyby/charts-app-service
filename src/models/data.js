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
const dimensionsSchema = new Schema({ id: Number });

const businessData = mongoose.model("businessData", dimensionsSchema);

const createData = (data = {}, id) => {
  return businessData.create(data, data._id = id);
}

const getData = (conditions, ) => {
  const cube = businessData.findOne(conditions);
}

const updateData = (conditions, updatedData) => {
  return businessData.findOneAndUpdate(conditions, updatedData);
}

const deleteData = (id) => {
  return businessData.findOneAndDelete(id);
}

module.exports = {
  createData,
  getData,
  updateData,
  deleteData
}
