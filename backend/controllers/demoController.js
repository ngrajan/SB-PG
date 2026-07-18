const catchAsync = require("../utils/catchAsync");
const Demo = require("../models/demoModel");

exports.getDemo = catchAsync(async (req, res, next) => {
  const data = await Demo.find();
  res.status(200).json({
    status: "success",
    data,
    length: data.length,
  });
});

exports.createDemo = catchAsync(async (req, res, next) => {
  const newDemo = await Demo.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      data: newDemo,
    },
  });
});
