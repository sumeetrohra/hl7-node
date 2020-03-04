const { getMedicalPractitionerId, getPatientId } = require('../../utils');
const { hasPatientAccess } = require('../Mutation/MedicalPractitioner');

async function searchPatients(parent, args, context, info) {
  const { medicalPractitionerId } = getMedicalPractitionerId(context);

  if (!args.email) {
    throw new Error("Please provide patient's email");
  }

  const where = { email_contains: args.email };
  const patients = await context.prisma.patients({ where });
  return patients.map(patient => {
    return {
      id: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      middleName: patient.middleName,
      dob: patient.dob,
      bloodGroup: patient.bloodGroup,
      sex: patient.sex,
      email: patient.email,
      contact1: patient.contact1,
      contact2: patient.contact2
    };
  });
}

async function getPatient(parent, args, context, info) {
  const { medicalPractitionerId } = getMedicalPractitionerId(context);
  const patientExists = await context.prisma.$exists.patient({
    id: args.patientId
  });
  if (!patientExists) {
    throw new Error('Please provide valid patient Id');
  }

  const hasAccess = await hasPatientAccess({
    context,
    medicalPractitionerId,
    patientId: args.patientId
  });
  if (!hasAccess) {
    throw new Error("You don't have the access to this patient");
  }

  return context.prisma.patient({ id: args.patientId });
}

async function getAccessiblePatients(parent, args, context, info) {
  const { medicalPractitionerId } = getMedicalPractitionerId(context);
  return context.prisma
    .medicalPractitioner({ id: medicalPractitionerId })
    .accessiblePatients();
}

async function getPatientData(parent, args, context, info) {
  const { patientId } = getPatientId(context);
  return context.prisma.patient({ id: patientId });
}

module.exports = {
  searchPatients,
  getPatient,
  getAccessiblePatients,
  getPatientData
};
