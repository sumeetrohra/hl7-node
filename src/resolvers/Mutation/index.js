const { adminSignup, adminLogin } = require('./Admin');
const { addHospital } = require('./Hospital');
const {
  addMedicalPractitioner,
  medicalPractitionerLogin,
  requestPatientAccess
} = require('./MedicalPractitioner');
const {
  addPatient,
  patientLogin,
  addInsurance,
  addCareProvider,
  denyAccessRequest,
  acceptAccessRequest,
  addPatientCase,
  addPatientRecord
} = require('./Patient');

module.exports = {
  adminSignup,
  adminLogin,
  addHospital,
  addMedicalPractitioner,
  medicalPractitionerLogin,
  addPatient,
  patientLogin,
  addInsurance,
  addCareProvider,
  requestPatientAccess,
  denyAccessRequest,
  acceptAccessRequest,
  addPatientCase,
  addPatientRecord,
}