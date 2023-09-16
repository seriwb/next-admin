//----- for API -----

// SWR fetch error
export type FetchError<T> = {
  response: Response;
  data: T;
} & Error

export type OffsetPaginator<T> = {
  rows: T[];
  offset: number;
  total: number;
};
