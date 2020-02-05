async function accessRequests(parent, args, context, info) {
  return context.prisma.patient({ id: parent.id }).accessRequests();
}

module.exports = {
  accessRequests,
};
