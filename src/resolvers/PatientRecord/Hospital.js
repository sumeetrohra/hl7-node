async function hospital(parent, args, context, info) {
  return context.prisma.patientRecord({ id: parent.id }).hospital();
}

module.exports = { hospital };
