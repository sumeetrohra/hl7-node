async function patientCase(parent, args, context, info) {
  return context.prisma.patient({ id: parent.id }).patientCase();
}

module.exports = {
  patientCase,
};
