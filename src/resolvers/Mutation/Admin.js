const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_APP_SECRET } = require('../../utils');

async function adminSignup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const admin = await context.prisma.createAdmin({ ...args, password });
  const token = jwt.sign({ adminId: admin.id }, JWT_APP_SECRET);

  return {
    token,
    admin
  }
}

async function adminLogin(parent, args, context, info) {
  const admin = await context.prisma.admin({ email: args.email });
  if (!admin) {
    throw new Error(`Invalid Email`);
  }

  const doesPasswordMatch = await bcrypt.compare(args.password, admin.password);
  if (!doesPasswordMatch) {
    throw new Error('Invalid Password');
  }

  const token = jwt.sign({ adminId: admin.id }, JWT_APP_SECRET);
  return {
    token,
    admin
  }
}

module.exports = {
  adminSignup,
  adminLogin
}