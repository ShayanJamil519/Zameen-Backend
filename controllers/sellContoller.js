const Property = require("../models/sellModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");

// Create Property :

exports.createProperty = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (const image of images) {
    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "property",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  req.body.user = req.user._id;

  const property = await Property.create(req.body);

  res.status(201).json({
    success: true,
    property,
  });
});

exports.getAllProperties = catchAsyncErrors(async (req, res, next) => {
  let properties = await Property.find();

  res.status(200).json({
    success: true,
    properties,
  });
});

// Get All Property -->User 2
exports.getAllProperty = catchAsyncErrors(async (req, res, next) => {
  const property = await Property.find();

  res.status(200).json({
    success: true,
    property,
  });
});

// Get Property Details:
exports.getPropertyDetails = catchAsyncErrors(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorHandler("Property with given id is not found", 404));
  }

  res.status(200).json({
    success: true,
    property,
  });
});

// Get All Property --Admin:
exports.getAllPropertiesForAdmin = catchAsyncErrors(async (req, res, next) => {
  const property = await Property.find();

  res.status(200).json({
    success: true,
    property,
  });
});

// Update Property --User

exports.updateProperty = catchAsyncErrors(async (req, res, next) => {
  let property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorHandler("Property not found", 404));
  }

  property = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    property,
  });
});

// Delete Property --User

exports.deleteProperty = catchAsyncErrors(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorHandler("Property not found", 404));
  }

  await property.remove();

  res.status(200).json({
    success: true,
    message: "Property Delete Successfully",
  });
});

// Get All Properties of a specific user :
exports.getAllPropertiesOfSpecificUser = catchAsyncErrors(
  async (req, res, next) => {
    let property = await Property.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      property,
    });
  }
);

// Create New Review or Update the review:

exports.createPropertyReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
  };

  const property = await Property.findById(productId);

  const isReviewed = property.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    property.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) rev.rating = rating;
    });
  } else {
    property.reviews.push(review);
    property.numOfReviews = property.reviews.length;
  }

  let avg = 0;
  property.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  property.ratings = avg / property.reviews.length;

  await property.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get all reviews of a  product:
exports.getPropertyReviews = catchAsyncErrors(async (req, res, next) => {
  const property = await Property.findById(req.query.id);
  if (!property) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: property.reviews,
  });
});
