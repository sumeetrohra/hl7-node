const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_APP_SECRET, getAdminId, getMedicalPractitionerId } = require('../../utils');

async function addMedicalPractitioner(parent, args, context, info) {
  const { adminId } = getAdminId(context);

  const password = await bcrypt.hash(args.password, 10);

  return context.prisma.createMedicalPractitioner({
    mpId: args.mpId,
    lastName: args.lastName,
    firstName: args.firstName,
    middleName: args.middleName,
    email: args.email,
    password,
    dob: args.dob,
    sex: args.sex,
    address: args.address,
    degree: args.degree,
    field: args.field,
    hospital: { connect: { id: args.hospitalId } }
  });
}

async function medicalPractitionerLogin(parent, args, context, info) {
  const mp = await context.prisma.medicalPractitioner({ email: args.email });
  if (!mp) {
    throw new Error(`Invalid Email`);
  }

  const doesPasswordMatch = await bcrypt.compare(args.password, mp.password);
  if (!doesPasswordMatch) {
    throw new Error('Invalid Password');
  }

  const token = jwt.sign({ medicalPractitionerId: mp.id }, JWT_APP_SECRET);
  return {
    token,
    medicalPractitioner: mp,
  }
}

async function hasPatientAccess({ context, medicalPractitionerId, patientId }) {
  const accessiblePatients = await context.prisma.medicalPractitioner({ id: medicalPractitionerId }).accessiblePatients();
  return accessiblePatients.some(patient => patient.id === patientId);
}

async function doesRequestExist({ context, medicalPractitionerId, patientId }) {
  const requests = await context.prisma.patient({ id: patientId }).accessRequests();
  return requests.filter(req => req.medicalPractitionerId === medicalPractitionerId);
}

async function requestPatientAccess(parent, args, context, info) {
  const { medicalPractitionerId } = getMedicalPractitionerId(context);
  if (!args.patientId) {
    throw new Error('Please enter patient Id');
  }

  const hasAccess = await hasPatientAccess({ context, medicalPractitionerId, patientId: args.patientId });

  if (hasAccess) {
    throw new Error('Already have access to this patient');
  }


  const requestExists = await doesRequestExist({ context, medicalPractitionerId, patientId: args.patientId });
  if (requestExists.length > 0) {
    return requestExists[0];
  }

  const mp = await context.prisma.medicalPractitioner({ id: medicalPractitionerId });


  await context.prisma.updatePatient({
    where: { id: args.patientId },
    data: {
      accessRequests: {
        create: {
          medicalPractitionerFirstName: mp.firstName,
          medicalPractitionerLastName: mp.lastName,
          medicalPractitionerId: mp.id,
        }
      }
    }
  });
  const res = await context.prisma.patient({ id: args.patientId }).accessRequests({
    where: { medicalPractitionerId: medicalPractitionerId }
  });
  return res[0];
}

module.exports = {
  addMedicalPractitioner,
  medicalPractitionerLogin,
  requestPatientAccess,
  hasPatientAccess
}