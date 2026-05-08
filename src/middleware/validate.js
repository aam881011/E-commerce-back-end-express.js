export const validate = (schema) => {
  return (req, res, next) => {
    let filter = {};
    if (req.file) {
      filter = { image: req.file, ...req.body, ...req.params, ...req.query };
    } else if (req.files) {
      filter = { ...req.files, ...req.body, ...req.params, ...req.query };
    } else {
      filter = { ...req.body, ...req.params, ...req.query };
    }

    const { error } = schema.validate(
      // { image, ...req.body, ...req.params, ...req.query },
      filter,
      { abortEarly: false }
    );

    let errors = [];
    if (error) {
      error.details.forEach((elm) => {
        errors.push({ message: elm.message, field: elm.path[0] });
      });
      res.json(errors);
    } else {
      next();
    }
  };
};
