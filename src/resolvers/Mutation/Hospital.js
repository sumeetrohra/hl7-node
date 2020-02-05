const { getAdminId } = require('../../utils');

async function addHospital(parent, args, context, info) {
  const { adminId } = getAdminId(context);
  return context.prisma.createHospital({ ...args });
}

module.exports = {
  addHospital,
}