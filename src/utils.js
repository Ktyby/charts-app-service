const generateDimensions = (data) => {
  const dimensions = [];

  const keys = Object.keys(data[0]);

  keys.shift();

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

module.exports = {
  generateDimensions
}