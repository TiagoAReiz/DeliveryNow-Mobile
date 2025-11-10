import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import  LoginService  from "@/services/login/login_service";

export default function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin () {
        LoginService.Login({
            email,
            password
        });
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login</Text>
            <TextInput
            placeholder="exemplo@gmail.com"
            value="email"
            onChangeText={setEmail} />


            <TextInput
            placeholder="Senha"
            value="password"
            onChangeText={setPassword} />
            
           <Button title="Login" onPress={handleLogin} color="#1E90FF" />

        </View>
    );
    }