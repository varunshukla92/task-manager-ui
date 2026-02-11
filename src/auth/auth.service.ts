import httpClient from "../services/httpClient";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  expiresIn: number;
};

export const loginApi = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
  const response = await httpClient.post<LoginResponse>(
    "/auth/api/v1/auth/login",
    payload
  );

  return response.data;
};
