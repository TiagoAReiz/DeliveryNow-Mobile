import { Pressable, Text, View } from 'react-native';
import { Avatar } from '../atoms/Avatar';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';
import { Shadows } from '@/src/constants/shadows';
import { GradientConfigs } from '@/src/constants/gradients';

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  error?: string | null;
  isFormFilled?: boolean;
}

export function LoginForm({ 
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  isLoading = false, 
  error,
  isFormFilled = false,
}: LoginFormProps) {

  return (
    <View>
      {/* Cabeçalho / Logo */}
      <View className="items-center mb-12">
        <View
          style={Shadows.shadowGlow}
          className="bg-slate-900 rounded-3xl p-6 mb-6 border border-white/10"
        >
          <Avatar 
            icon="cube" 
            size="large" 
            gradientConfig={GradientConfigs.logo}
          />
        </View>
        <Text className="text-4xl font-black text-white text-center mb-2 tracking-tight">
          Bem-vindo
        </Text>
        <Text className="text-slate-400 text-base text-center">
          Acesse sua conta para gerenciar entregas
        </Text>
      </View>

      {/* Formulário */}
      <View className={`rounded-2xl p-4 ${error ? 'bg-red-500/10' : ''}`}>
        {error && <Text className="text-red-500 mb-4">{error}</Text>}
        
        {/* Input Email */}
        <FormField
          label="E-mail"
          icon="envelope"
          placeholder="exemplo@email.com"
          value={email}
          onChangeText={onEmailChange}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Input Senha */}
        <FormField
          label="Senha"
          icon="lock"
          placeholder="Digite sua senha"
          value={password}
          onChangeText={onPasswordChange}
          secureTextEntry
        />

        {/* Esqueceu a senha */}
        <Pressable className="items-end pt-1 mb-4">
          <Text className="text-indigo-400 font-semibold text-sm">
            Esqueceu sua senha?
          </Text>
        </Pressable>

        {/* Botão de Login */}
        <Button
          title="Entrar"
          onPress={onSubmit}
          disabled={isLoading || !isFormFilled}
          isLoading={isLoading}
          variant="primary"
        />
      </View>
    </View>
  );
}

