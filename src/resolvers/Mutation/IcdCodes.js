const data = require('./icdCodes.json');
const subCodesData = require('./icdSubCodes.json');

async function populateIcdCodes(parent, args, context, info) {
  data['icd_codes'].forEach(async (el) => {
    await context.prisma.createIcdCodes(el);
  });
  return true;
}

async function populateIcdSubCodes(parent, args, context, info) {
  subCodesData['icd_sub_codes'].forEach(async (el) => {
    await context.prisma.createIcdSubCodes({
      icdSubCode: el.icdSubCode,
      scientificName: el.scientificName,
      icdCode: { connect: { icdCode: el.icdCode } },
    });
  });
  return true;
}

module.exports = {
  populateIcdCodes,
  populateIcdSubCodes,
};
