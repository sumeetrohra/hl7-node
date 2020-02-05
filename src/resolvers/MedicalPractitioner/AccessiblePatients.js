async function accessiblePatients(parent, args, context, info) {
  return context.prisma.medicalPractitioner({ id: parent.id }).accessiblePatients();
}

module.exports = {
  accessiblePatients,
};
