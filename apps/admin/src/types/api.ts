//----- for API -----

export type OffsetPaginator<T> = {
  rows: T[];
  offset: number;
  total: number;
};
