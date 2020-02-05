async function mp(parent, args, context, info) {
  return context.prisma.patientCase({ id: parent.id }).mp();
}

module.exports = { mp };
