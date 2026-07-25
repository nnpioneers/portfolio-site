export interface BaseResponse<T = any> {
  success: boolean;
  data: T | null;
  error: { code: string; message: string } | null;
  requestId: string;
  timestamp: string;
}

export interface PaginationDTO {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends BaseResponse<T[]> {
  pagination: PaginationDTO;
}
