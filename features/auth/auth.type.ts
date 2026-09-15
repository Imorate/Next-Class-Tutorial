export interface SignupResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  authorized: boolean;
  user: User;
}

export interface SessionResponse {
  authorized: boolean;
  session?: {
    id: string;
  };
}
