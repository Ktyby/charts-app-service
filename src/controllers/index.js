const data = require("../models/data");
const { HTTP_STATUS_CODES } = require("../constants");

const handleCreationDataRequest = async (req, res) => {
  try {
    const result = await data.createData(req.body.facts, req.query.value);
    res
      .status(HTTP_STATUS_CODES.OK)
      .send(result)
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ error });
  }
}

const handleAdditionalDataRequest = async (req, res) => {
  try {
    const result = await data.addData(req.body.facts, req.params.id, req.query);
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
    const result = await data.deleteData(req.query, req.body.facts);
    res
      .status(HTTP_STATUS_CODES.OK)
      .send(result)
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ error });
  }
}

const handleUpdateFullDocumentRequest = async (req, res) => {
  try {
    const result = await data.updateFullDocument(req.query, req.body);
    res
      .status(HTTP_STATUS_CODES.OK)
      .send(result)
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ error });
  }
}

const handleUpdatePartDocumentRequest = async (req, res) => {
  try {
    const result = await data.updatePartDocument(req.query, req.body);
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
  handleAdditionalDataRequest,
  handleGettingDataRequest,
  handleDeleteDataRequest,
  handleUpdateFullDocumentRequest,
  handleUpdatePartDocumentRequest
}