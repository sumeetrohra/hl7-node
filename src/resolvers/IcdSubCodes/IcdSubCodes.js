async function icdCode(parent, args, context, info) {
  return context.prisma.icdSubCodes({ id: parent.id }).icdCode();
}

module.exports = {
  icdCode,
};
