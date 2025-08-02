export interface Filters {
  categories: number[] | [];
  brands: string[] | [];
  priceMin: number;
  priceMax: number;
  sortBy: string;
  page: number;
  limit: number;
}
