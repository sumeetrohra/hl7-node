async function icdCode(parent, args, context, info) {
  return context.prisma.patientCase({ id: parent.id }).icdCode();
}

module.exports = { icdCode };
