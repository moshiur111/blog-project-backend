import { Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchAbleFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchAbleFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      });
    }
    return this;
  }

  filter(filterField: string) {
    const filterValue = this.query?.filter;
    if (filterValue) {
      this.modelQuery = this.modelQuery.find({ [filterField]: filterValue });
    }
    return this;
  }

  sort(defaultSortField: string = 'createdAt') {
    const sortBy = this.query?.sortBy || defaultSortField;
    const sortOrder = this.query?.sortOrder === 'desc' ? -1 : 1;
    this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrder });
    return this;
  }
}

export default QueryBuilder;
