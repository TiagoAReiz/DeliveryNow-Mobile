import { api } from "@/config/api";
import { LoginRequest } from "./dtos/login_request";
import { LoginResponse } from "./dtos/login_response";



class LoginService{

    public async login(data: LoginRequest): Promise<LoginResponse> {
        var response = await api.post<LoginResponse>('/login', data);
        return response.data;
    }

    

}
export default new LoginService();