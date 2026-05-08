import Joi from "joi";

const addProductVal = Joi.object({
  title: Joi.string().min(2).max(300).required().trim(),
  description: Joi.string().min(10).max(1500).required().trim(),
  price: Joi.number().min(0).required(),
  priceAfterDiscount: Joi.number().min(0).optional(),
  quantity: Joi.number().min(0).optional(),
  category: Joi.string().hex().length(24).required(),
  subcategory: Joi.string().hex().length(24).required(),
  brand: Joi.string().hex().length(24).required(),
  createdBy: Joi.string().hex().length(24).optional(),

  imgCover: Joi.array().items(
    Joi.object({
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      encoding: Joi.string().required(),
      mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
      size: Joi.number().max(5242880).required(),
      destination: Joi.string().required(),
      filename: Joi.string().required(),
      path: Joi.string().required(),
    })
  ),
  images: Joi.array().items(
    Joi.object({
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      encoding: Joi.string().required(),
      mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
      size: Joi.number().max(5242880).required(),
      destination: Joi.string().required(),
      filename: Joi.string().required(),
      path: Joi.string().required(),
    })
  ),
});

const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
