const data = require("../models/data");
const { HTTP_STATUS_CODES } = require("../constants");

const handleCreationDataRequest = async (req, res) => {
  try {
    await data.createData(req.body, req.params);
    res
      .status(HTTP_STATUS_CODES.OK)
      .send(req.params)
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ error });
  }
}

const handleGettingDataRequest = async (req, res) => {
  try {
    await data.getData(req.params);
    res
      .status(HTTP_STATUS_CODES.OK)
      .send(req)
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ error });
  }
}

const handleDeleteDataRequest = async (req, res) => {
  try {
    await data.deleteData(req.params.id);
    res
      .status(HTTP_STATUS_CODES.OK)
      .send(req)
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ error });
  }
}

const handleUpdateDataRequest = async (req, res) => {
  try {
    await data.updateData(req.params);
    res
      .status(HTTP_STATUS_CODES.OK)
      .send(req)
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