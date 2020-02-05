const { mp } = require('./MedicalPractitioner');
const { icdCode } = require('./IcdCode');
const { icdSubCode } = require('./IcdSubCode');
const { records } = require('./PatientRecord');
const { hospital } = require('./Hospital');

module.exports = {
  mp,
  icdCode,
  icdSubCode,
  records,
  hospital,
};
