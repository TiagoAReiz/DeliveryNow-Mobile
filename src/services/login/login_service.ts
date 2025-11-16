import { api } from "@/src/config/api";
import { LoginRequest } from "./dtos/login_request";
import { LoginResponse } from "./dtos/login_response";

class LoginService {
  public async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      var response = await api.post<LoginResponse>("/login", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export default new LoginService();
