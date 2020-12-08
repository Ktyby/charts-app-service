const { v4: uuidv4 } = require('uuid');

const VALUE_NAME = "value";

const generateDimensions = (data) => {
  const dimensions = [];

  const keys = Object.keys(data);
  keys.shift()
  keys.pop();  

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

module.exports = {
  generateDimensions,
  addMeasuresId,
  checkIsValueAndSet
}