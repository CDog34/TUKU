import _ from 'lodash';
export function paginationMiddleware() {
  return async (ctx, next) => {
    ctx.getPaginationSpec = () => ({
      pageSize: parseInt(ctx.query.pageSize || 10, 10),
      marker: ctx.query.marker || null,
      pageIndex: parseInt(ctx.query.pageIndex || 0, 0)
    });
    await next();
  };
}
export class PageResolver {
  model;
  paginationSpec;

  constructor(model, paginationSpec) {
    this.model = model;
    this.paginationSpec = paginationSpec;
  }

  async find(query, projection, {sortKey, sortOrder}) {
    const sort = {[sortKey]: sortOrder};
    const {pageIndex, pageSize} = this.paginationSpec;
    const [count, items] = await Promise.all([
      this.model.count(query)
        .exec(),
      this.model.find(query, projection)
        .sort(sort)
        .skip(pageSize * pageIndex)
        .limit(pageSize)
        .lean()
        .exec()
    ]);
    return {
      count,
      items
    };
  }
}
export class MarkerResolver {
  model;
  paginationSpec;

  constructor(model, paginationSpec) {
    this.model = model;
    this.paginationSpec = paginationSpec;
  }

  addMarkerToQuery(query, sortKey, sortOrder) {
    const {marker} = this.paginationSpec;
    if (marker !== null) {
      const markerQuery = sortOrder > 0 ? {$gt: marker} : {$lt: marker};
      if (query[sortKey]) {
        const originalSortKeyQuery = query[sortKey];
        const sortKeyQueryWithMarker = [
          {[sortKey]: originalSortKeyQuery},
          {[sortKey]: markerQuery}
        ];
        if (query.$and) query.$and = query.$and.concat(sortKeyQueryWithMarker);
        else query.$and = sortKeyQueryWithMarker;
        delete query[sortKey];
      } else {
        query[sortKey] = markerQuery;
      }
    }
    return query;
  }

  async find(query, projection, {sortKey, sortOrder}) {
    const countQuery = _.cloneDeep(query);
    const sort = {[sortKey]: sortOrder};
    const queryWithMarker = this.addMarkerToQuery(query, sortKey, sortOrder);
    const {pageSize} = this.paginationSpec;
    const [count, items] = await Promise.all([
      this.model.count(countQuery)
        .exec(),
      this.model.find(queryWithMarker, projection)
        .sort(sort)
        .limit(pageSize + 1)
        .lean()
        .exec()
    ]);
    let marker;
    if (items && items.length > pageSize) {
      marker = _.get(items[pageSize - 1], sortKey);
      items.pop();
    }
    return {
      count,
      items,
      marker
    };
  }
}