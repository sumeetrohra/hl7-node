const { getIcdCodes, getIcdSubCodes } = require('./IcdCodes');
const { getHospitals } = require('./Hospital');
const { searchPatients, getPatient } = require('./Patient');

module.exports = {
  getIcdCodes,
  getIcdSubCodes,
  getHospitals,
  searchPatients,
  getPatient,
}