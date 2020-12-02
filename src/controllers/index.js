const data = require("../models/data");
const { HTTP_STATUS_CODES } = require("../constants");

const handleCreationDataRequest = async (req, res) => {
  try {
    const result = await data.createData(req.body, req.params.id);
    res
      .status(HTTP_STATUS_CODES.OK)
      .send(result)
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ error });
  }
}

const handleGettingDataRequest = async (req, res) => {
  try {
    const result = await data.getData(req.query);
    res
      .status(HTTP_STATUS_CODES.OK)
      .send(result)
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ error });
  }
}

const handleDeleteDataRequest = async (req, res) => {
  try {
    const result = await data.deleteData(req.query);
    res
      .status(HTTP_STATUS_CODES.OK)
      .send(result)
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ error });
  }
}

const handleUpdateDataRequest = async (req, res) => {
  try {
    const result = await data.updateData(req.query, req.body);
    res
      .status(HTTP_STATUS_CODES.OK)
      .send(result)
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ error });
  }
}

module.exports = {
  handleCreationDataRequest,
  handleGettingDataRequest,
  handleDeleteDataRequest,
  handleUpdateDataRequest
}