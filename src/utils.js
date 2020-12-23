const { v4: uuidv4 } = require('uuid');
const User = require('./models/users');

const VALUE_NAME = "value";

const deleteArrayItem = (array, element) => {
  const index = array.indexOf(element);
  array.splice(index, 1);
}

const generateDimensions = (data) => {
  const dimensions = [];

  const keys = Object.keys(data);
  deleteArrayItem(keys, "id");
  deleteArrayItem(keys, "value");

  keys.forEach((element) => {
    dimensions.push({
      dimensionTable: {
        dimension: element,
        keyProps: [element],
      }
    });
  });

  return dimensions;
}

const addMeasuresId = (data) => {
  return data.map((element) => {
    if (!element.id) {
      const randomId = uuidv4().split("-").join();    
      return element.id = parseInt(randomId, 16);
    }
  });
}

const checkIsValueAndSet = (data, value  = "value") => {
  data.forEach((element) => {
    if (typeof element[value] !== VALUE_NAME) {
      element[VALUE_NAME] = element[value];
      delete element[value];
    }
  });
}

const checkIfIsAccess = async (userId, dataId) => {
  const [ user ] = await User.find({ _id: userId });

  return user._doc.data.find((index) => toString(index) === toString(dataId));
}

module.exports = {
  generateDimensions,
  addMeasuresId,
  checkIsValueAndSet,
  checkIfIsAccess
}