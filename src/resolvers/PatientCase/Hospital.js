async function hospital(parent, args, context, info) {
  return context.prisma.patientCase({ id: parent.id }).hospital();
}

module.exports = { hospital };
