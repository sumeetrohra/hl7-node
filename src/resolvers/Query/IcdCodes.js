async function getIcdCodes(parent, args, context, info) {
  return context.prisma.icdCodeses({});
}

async function getIcdSubCodes(parent, args, context, info) {
  return context.prisma.icdSubCodeses({});
}

module.exports = {
  getIcdCodes,
  getIcdSubCodes
}