import { api } from "@/config/api";
import { LoginRequest } from "./dtos/login_request";
import { LoginResponse } from "./dtos/login_response";
import AsyncStorage from "@react-native-async-storage/async-storage";

class LoginService{

    public async Login(data: LoginRequest): Promise<void> {
        var response = await api.post<LoginResponse>('/login', data);
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem("user_id", response.data.id);
    }
}
export default new LoginService();