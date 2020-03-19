async function files(parent, args, context, info) {
  return context.prisma.patientRecord({ id: parent.id }).files();
}

module.exports = { files };
