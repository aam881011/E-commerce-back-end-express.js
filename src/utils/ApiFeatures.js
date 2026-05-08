export class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }
  //paginate
  paginate() {
    const PAGE_LIMIT = 5;
    let PAGE_NUMBER = this.queryString.page * 1 || 1;
    
    if (PAGE_NUMBER <= 0) PAGE_NUMBER = 1;
    const SKIP = (PAGE_NUMBER - 1) * PAGE_LIMIT;
    this.PAGE_NUMBER = PAGE_NUMBER;

    this.mongooseQuery.skip(SKIP).limit(PAGE_LIMIT);
    return this;
  }

  // filter
  filter() {
    let filter = { ...this.queryString };
    let excludedQuery = ["page", "sort", "fields", "keyword"];
    excludedQuery.forEach((item) => {
      delete filter[item];
    });

    filter = JSON.stringify(filter);
    filter = filter.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    filter = JSON.parse(filter);
    this.mongooseQuery.find(filter);
    return this;
  }

  // sort
  sort() {
    if (this.queryString.sort) {
      let sortedBy = this.queryString.sort.split(",").join("");
      this.mongooseQuery.sort(sortedBy);
    }
    return this;
  }

  // search
  search() {
    if (this.queryString.keyword) {
      this.mongooseQuery.find({
        $or: [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ],
      });
    }
    return this;
  }

  // Selected Fields
  fields() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(",").join("");
      this.mongooseQuery.select(fields);
    }
    return this;
  }
}

