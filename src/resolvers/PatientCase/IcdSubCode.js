async function icdSubCode(parent, args, context, info) {
  return context.prisma.patientCase({ id: parent.id }).icdSubCode();
}

module.exports = { icdSubCode };
