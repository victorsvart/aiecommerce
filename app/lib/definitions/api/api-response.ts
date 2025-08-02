export class ApiResponse<T> {
  success: boolean;
  data: T;
  errors: string[];

  constructor(success: boolean, data: T, errors: string[]) {
    this.success = success;
    this.data = data;
    this.errors = errors;
  }

  static success<T>(data: T): ApiResponse<T> {
    return new ApiResponse<T>(true, data, []);
  }

  static error<T>(errors: string[]): ApiResponse<T> {
    return new ApiResponse<T>(false, [] as T, errors);
  }
}
