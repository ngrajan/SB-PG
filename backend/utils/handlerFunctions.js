const mongoose = require("mongoose");
const catchAsync = require("./catchAsync");
const AppError = require("./appError");

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // API filters are yet to implement
    const docs = await Model.find();

    if (!docs) return next(new AppError("No doucments found", 404));

    res.status(200).json({
      status: "success",
      data: docs,
      results: docs.length,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const query = Model.findById(req.params.id);
    if (popOptions) doc.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("Document not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: doc,
    });
  });

exports.refCreateOne = (Model, refModel, refField, updateField) =>
  catchAsync(async (req, res) => {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const [doc] = await Model.create([req.body], { session });

      await refModel.findByIdAndUpdate(
        req.body[refField],
        {
          $push: { [updateField]: doc._id },
        },
        { session },
      );

      await session.commitTransaction();

      res.status(201).json({
        status: "success",
        data: doc,
      });
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.patchOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(
      req.params.id,
      { isDeleted: true },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.refDeleteOne = (Model, refModel, refField, updateField) =>
  catchAsync(async (req, res) => {
    const session = await mongoose.startSession();
    try {
      await session.startTransaction();

      const doc = await Model.findOne({ _id: req.params.id }).session(session);

      await Model.findByIdAndDelete(req.params.id, { session });

      await refModel.findByIdAndUpdate(
        doc[refField],
        {
          $pull: { [updateField]: req.params.id },
        },
        { session },
      );

      await session.commitTransaction();

      res.status(204).json({ status: "success", data: null });
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  });
