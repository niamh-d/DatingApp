export type Pagination = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
};

export type PaginatedResult<T> = {
  items: T[];
  metadata: Pagination;
};
