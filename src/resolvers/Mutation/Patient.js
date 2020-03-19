const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  JWT_APP_SECRET,
  getMedicalPractitionerId,
  getPatientId
} = require('../../utils');
const { hasPatientAccess } = require('./MedicalPractitioner');

async function addPatient(parent, args, context, info) {
  const { medicalPractitionerId } = getMedicalPractitionerId(context);

  const password = await bcrypt.hash(args.password, 10);

  await context.prisma.updateMedicalPractitioner({
    where: { id: medicalPractitionerId },
    data: {
      accessiblePatients: {
        create: {
          lastName: args.lastName,
          firstName: args.firstName,
          middleName: args.middleName,
          motherName: args.motherName,
          dob: args.dob,
          bloodGroup: args.bloodGroup,
          sex: args.sex,
          religion: args.religion,
          maritalStatus: args.maritalStatus,
          primaryLanguage: args.primaryLanguage,
          birthPlace: args.birthPlace,
          address: args.address,
          countryCode: args.countryCode,
          occupation: args.occupation,
          contact1: args.contact1,
          contact2: args.contact2,
          email: args.email,
          password,
          socioEconomicStatus: args.socioEconomicStatus,
          immunizationStatus: args.immunizationStatus,
          allergyStatus: args.allergyStatus,
          organDonorStatus: args.organDonorStatus,
          PMH: args.PMH,
          DHx: args.DHx,
          Ca: args.Ca,
          IDDM: args.IDDM,
          NIDDM: args.NIDDM,
          MI: args.MI,
          AF: args.AF
        }
      }
    }
  });

  return context.prisma.patient({ email: args.email });
}

async function patientLogin(parent, args, context, info) {
  const patient = await context.prisma.patient({ email: args.email });
  if (!patient) {
    throw new Error('Invalid Email');
  }

  const doesPasswordMatch = await bcrypt.compare(
    args.password,
    patient.password
  );
  if (!doesPasswordMatch) {
    throw new Error('Invalid Password');
  }

  const token = jwt.sign({ patientId: patient.id }, JWT_APP_SECRET);
  return {
    token,
    patient
  };
}

async function addInsurance(parent, args, context, info) {
  const { patientId } = getPatientId(context);

  return context.prisma.updatePatient({
    where: { id: patientId },
    data: {
      insurance: {
        create: {
          status: args.status,
          companyName: args.companyName
        }
      }
    }
  });
}

async function addCareProvider(parent, args, context, info) {
  const { patientId } = getPatientId(context);

  return context.prisma.updatePatient({
    where: { id: patientId },
    data: {
      careProvider: {
        create: {
          firstName: args.firstName,
          lastName: args.lastName,
          middleName: args.middleName,
          address: args.address,
          cityId: args.cityId,
          stateId: args.stateId,
          pinCode: args.pinCode,
          countryCode: args.countryCode,
          contact1: args.contact1,
          email: args.email
        }
      }
    }
  });
}

async function denyAccessRequest(parent, args, context, info) {
  const { patientId } = getPatientId(context);

  return context.prisma.deleteAccessRequest({ id: args.accessRequestId });
}

async function acceptAccessRequest(parent, args, context, info) {
  if (!args.accessRequestId) {
    throw new Error('please provide valid access request id');
  }
  const { patientId } = getPatientId(context);
  const request = await context.prisma.accessRequest({
    id: args.accessRequestId
  });
  await context.prisma.updateMedicalPractitioner({
    where: { id: request.medicalPractitionerId },
    data: {
      accessiblePatients: { connect: { id: patientId } }
    }
  });
  return context.prisma.deleteAccessRequest({ id: args.accessRequestId });
}

async function addPatientCase(parent, args, context, info) {
  const { medicalPractitionerId } = getMedicalPractitionerId(context);

  const hasAccess = await hasPatientAccess({
    context,
    medicalPractitionerId,
    patientId: args.patientId
  });
  if (!hasAccess) {
    throw new Error("You don't have the access to this patient");
  }

  const caseExists = await context.prisma
    .patient({ id: args.patientId })
    .patientCase();
  if (caseExists) {
    throw new Error('Case already exists');
  }

  return context.prisma.updatePatient({
    where: { id: args.patientId },
    data: {
      patientCase: {
        create: {
          mp: { connect: { id: args.mpId } },
          icdCode: { connect: { id: args.icdCodeId } },
          icdSubCode: { connect: { id: args.icdSubCodeId } },
          hospital: { connect: { id: args.hospitalId } },
          HPC: args.HPC,
          MoI: args.MoI,
          DnV: args.DnV,
          clinicNote: args.clinicNote,
          diagnosisType: args.diagnosisType,
          currentClinicalStatus: args.currentClinicalStatus
        }
      }
    }
  });
}

async function addPatientRecord(parent, args, context, info) {
  const { medicalPractitionerId } = getMedicalPractitionerId(context);

  const hasAccess = await hasPatientAccess({
    context,
    medicalPractitionerId,
    patientId: args.patientId
  });
  if (!hasAccess) {
    throw new Error("You don't have the access to this patient");
  }

  const patientRecords = await context.prisma
    .patientCase({ id: args.patientCaseId })
    .records();

  return context.prisma.updatePatientCase({
    where: { id: args.patientCaseId },
    data: {
      records: {
        create: {
          visitNo: patientRecords.length + 1 || 1,
          eventType: args.eventType,
          mp: { connect: { id: args.mpId } },
          hospital: { connect: { id: args.hospitalId } },
          observation: args.observation,
          Tx: args.Tx,
          suggesstions: args.suggesstions,
          cevsSp: args.cevsSp,
          cevsDp: args.cevsDp,
          cePr: args.cePr,
          ceRr: args.ceRr,
          ceHeight: args.ceHeight,
          ceWeight: args.ceWeight,
          medication: args.medication,
          advice: args.advice,
          query: args.query,
          followUpObservation: args.followUpObservation
        }
      }
    }
  });
}

async function addPatientRecordFile(parent, args, context, info) {
  const { medicalPractitionerId } = getMedicalPractitionerId(context);

  const hasAccess = await hasPatientAccess({
    context,
    medicalPractitionerId,
    patientId: args.patientId
  });
  if (!hasAccess) {
    throw new Error("You don't have the access to this patient");
  }

  return context.prisma.updatePatientRecord({
    where: { id: args.patientRecordId },
    data: {
      files: {
        create: {
          name: args.fileName,
          url: args.fileUrl
        }
      }
    }
  });
}

module.exports = {
  addPatient,
  patientLogin,
  addInsurance,
  addCareProvider,
  denyAccessRequest,
  acceptAccessRequest,
  addPatientCase,
  addPatientRecord,
  addPatientRecordFile
};
