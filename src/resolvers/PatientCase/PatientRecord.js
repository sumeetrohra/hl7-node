async function records(parent, args, context, info) {
  return context.prisma.patientCase({ id: parent.id }).records();
}

module.exports = { records };
