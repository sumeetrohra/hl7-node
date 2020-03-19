const { GraphQLServer } = require('graphql-yoga');
require('dotenv').config();

const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const IcdSubCodes = require('./resolvers/IcdSubCodes');
const MedicalPractitioner = require('./resolvers/MedicalPractitioner');
const Patient = require('./resolvers/Patient');
const PatientCase = require('./resolvers/PatientCase');
const PatientRecord = require('./resolvers/PatientRecord');

const resolvers = {
  Query,
  Mutation,
  IcdSubCodes,
  MedicalPractitioner,
  Patient,
  PatientCase,
  PatientRecord
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});
server.start(({ port }) => {
  console.log(`running on port: ${port}`);
});
