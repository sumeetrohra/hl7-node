async function careProvider(parent, args, context, info) {
  return context.prisma.patient({ id: parent.id }).careProvider();
}

module.exports = {
  careProvider,
};
