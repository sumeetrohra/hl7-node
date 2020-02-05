require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_APP_SECRET = process.env.JWT_APP_SECRET;

function getDecodedObject(context) {
  const Authorization = context.request.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    return jwt.verify(token, JWT_APP_SECRET);
  }

  throw new Error('Not Authenticated');
}

function getAdminId(context) {
  return { adminId: getDecodedObject(context).adminId };
}

function getMedicalPractitionerId(context) {
  return { medicalPractitionerId: getDecodedObject(context).medicalPractitionerId };
}

function getPatientId(context) {
  return { patientId: getDecodedObject(context).patientId };
}

module.exports = {
  JWT_APP_SECRET,
  getAdminId,
  getMedicalPractitionerId,
  getPatientId,
}