export interface dataType {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  heroes: object[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}
