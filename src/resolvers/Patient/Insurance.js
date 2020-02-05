async function insurance(parent, args, context, info) {
  return context.prisma.patient({ id: parent.id }).insurance();
}

module.exports = {
  insurance,
};
