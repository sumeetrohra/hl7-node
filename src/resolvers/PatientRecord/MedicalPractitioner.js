async function mp(parent, args, context, info) {
  return context.prisma.patientRecord({ id: parent.id }).mp();
}

module.exports = { mp };
