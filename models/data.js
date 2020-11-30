const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dimensions = [];

// {
//   dimensionTable: {
//     dimension: 'regions',
//     keyProps: ['region'],
//   }
// },
// {
//   dimensionTable: {
//     dimension: 'year',
//     keyProps: ['year']
//   }
// },  
// {
//   dimensionTable: {
//     dimension: 'month',
//     keyProps: ['month']
//   }
// },
// {
//   dimensionTable: {
//     dimension: 'products',
//     keyProps: ['product'],
//   }
// }

const cube = new Cube({ dimensions });
const dimensionsSchema = new Schema({ cube });

const businessData = mongoose.model("businessData", dimensionsSchema);
