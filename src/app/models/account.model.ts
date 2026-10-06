export interface ApiResponse {
  result: number;
  error?: string;
}

export interface RegisterModel {
  username: string;
  password: string;
  confirm: string;
}