// src/types/authTypes.ts
export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
  }
  