async function getHospitals(parent, args, context, info) {
  return context.prisma.hospitals();
}

module.exports = {
  getHospitals,
}