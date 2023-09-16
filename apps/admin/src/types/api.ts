//----- for API -----

// SWR fetch error
export interface FetchError<T> extends Error {
  response: Response;
  data: T;
}

export type OffsetPaginator<T> = {
  rows: T[];
  offset: number;
  total: number;
};
