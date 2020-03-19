"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "IcdCodes",
    embedded: false
  },
  {
    name: "IcdSubCodes",
    embedded: false
  },
  {
    name: "Admin",
    embedded: false
  },
  {
    name: "MedicalPractitioner",
    embedded: false
  },
  {
    name: "Hospital",
    embedded: false
  },
  {
    name: "Patient",
    embedded: false
  },
  {
    name: "AccessRequest",
    embedded: false
  },
  {
    name: "PatientCase",
    embedded: false
  },
  {
    name: "PatientRecord",
    embedded: false
  },
  {
    name: "File",
    embedded: false
  },
  {
    name: "CareProvider",
    embedded: false
  },
  {
    name: "Insurance",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env["PRISMA_STAGE_ENDPOINT"]}`
});
exports.prisma = new exports.Prisma();
