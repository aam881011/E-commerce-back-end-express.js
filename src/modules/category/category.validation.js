import joi from "joi";

let idValidation = joi.string().hex().length(24).required();

const addCategoryValidation = joi.object({
  name: joi.string().min(4).max(55).required(),
  image: joi
    .object({
      fieldname: joi.string().required(),
      originalname: joi.string().required(),
      encoding: joi.string().required(),
      mimetype: joi
        .string()
        .valid("image/jpeg", "image/png", "image/jpg")
        .required(),
      size: joi.number().max(5242880).required(),
      destination: joi.string().required(),
      filename: joi.string().required(),
      path: joi.string().required(),
    })
    .required(),

  // .options({ presence: 'required' }),
});

const updateCategoryValidation = joi.object({
  id: idValidation,
  name: joi.string().min(4).max(55),
});

// const deleteCategoryValidation = joi.object({
//   id: idValidation,
// });

// const getCategoryByIdValidation = joi.object({
//   id: idValidation,
// })

const paramsIdVal = joi.object({
  id: idValidation,
});

export {
  addCategoryValidation,
  // deleteCategoryValidation,
  // getCategoryByIdValidation
  paramsIdVal,
  updateCategoryValidation,
};

// Validation
