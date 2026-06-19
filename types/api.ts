import { ApiStatus } from './enums';

// Generic API response structure
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number; // HTTP status code
  success: boolean;
}

// Paginated response wrapper
export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// Frontend application state tracker for API calls
export interface ApiState<T> {
  data: T | null;
  status: ApiStatus;
  error: string | null;
}