const data = require("../models/data");
const { HTTP_STATUS_CODES } = require("../constants");

const handleCreationDataRequest = async (req, res) => {
  try {
    const result = await data.createData(req.body.facts, req.query.value, req.session.passport.user);
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
    const result = await data.addData(req.body.facts, req.params.id, req.query, req.session.passport.user);
    res
      .status(HTTP_STATUS_CODES.OK)
      .send(result)
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ error });
  }
}

const handleGettingMeasuresRequest = async (req, res) => {
  try {
    const result = await data.getMeasure(req.body.id, req.session.passport.user);
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
    const result = await data.getData(req.body, req.params.id, req.session.passport.user);
    res
      .status(HTTP_STATUS_CODES.OK)
      .send(result)
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ error });
  }
}

const handleGettingAllCubesRequest = async (req, res) => {
  try {
    const result = await data.getIdAllCubes(req.session.passport.user);
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
    const result = await data.deleteData(req.query, req.body.facts, req.session.passport.user);
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
    const result = await data.updateFullDocument(req.query, req.body.facts, req.session.passport.user);
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
    const result = await data.updateMeasuresMember(req.body, req.session.passport.user);
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
  handleGettingMeasuresRequest,
  handleGettingDataRequest,
  handleGettingAllCubesRequest,
  handleDeleteDataRequest,
  handleUpdateFullDocumentRequest,
  handleUpdatePartDocumentRequest
}