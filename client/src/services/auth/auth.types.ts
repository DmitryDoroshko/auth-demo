export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
};

export type RegisterResponse = {
  id: number;
  email: string;
  name: string;
  created_at: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  email: string;
  name: string;
  created_at: string;
};

export type ProfileResponse = {
  id: number;
  email: string;
  name: string;
  created_at: string;
};