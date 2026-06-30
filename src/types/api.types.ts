/** Matches backend GenericResponse<T> */
export interface GenericResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/** Matches Spring Data Page<T> returned inside GenericResponse.data */
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
