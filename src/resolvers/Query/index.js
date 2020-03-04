const { getIcdCodes, getIcdSubCodes } = require('./IcdCodes');
const { getHospitals } = require('./Hospital');
const {
  searchPatients,
  getPatient,
  getAccessiblePatients,
  getPatientData
} = require('./Patient');

module.exports = {
  getIcdCodes,
  getIcdSubCodes,
  getHospitals,
  searchPatients,
  getPatient,
  getAccessiblePatients,
  getPatientData
};
