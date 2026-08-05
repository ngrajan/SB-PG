const Tenant = require("../models/tenantModel");
const Room = require("../models/roomModel");
const handlerFunction = require("../utils/handlerFunctions");

exports.createTenant = handlerFunction.refCreateOne(
  Tenant,
  Room,
  "roomNumber",
  "tenants",
);
exports.getAllTenants = handlerFunction.getAll(Tenant);
exports.getTenant = handlerFunction.getOne(Tenant);
exports.patchTenant = handlerFunction.patchOne(Tenant);
exports.deleteTenant = handlerFunction.refDeleteOne(
  Tenant,
  Room,
  "roomNumber",
  "tenants",
);
