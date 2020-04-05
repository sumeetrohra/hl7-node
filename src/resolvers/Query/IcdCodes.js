async function getIcdCodes(parent, args, context, info) {
  return context.prisma.icdCodeses({
    where: {
      icdCode_contains: args.icdCode,
    },
  });
}

async function getIcdSubCodes(parent, args, context, info) {
  return context.prisma.icdSubCodeses({
    where: {
      icdCode: { id: args.icdCodeId },
    },
  });
}

module.exports = {
  getIcdCodes,
  getIcdSubCodes,
};
