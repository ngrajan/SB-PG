const Tenant = require("../models/tenantModel");
const handlerFunction = require("../utils/handlerFunctions");

exports.createTenant = handlerFunction.createOne(Tenant);
