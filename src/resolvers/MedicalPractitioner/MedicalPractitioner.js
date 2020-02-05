// MedicalPractitioner
async function hospital(parent, args, context, info) {
  return context.prisma.medicalPractitioner({ id: parent.id }).hospital();
}

module.exports = {
  hospital,
}