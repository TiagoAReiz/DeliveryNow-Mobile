import '@/global.css';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { GradientBackground } from '../components/ui/atoms/GradientBackground';
import { LoginForm } from '../components/ui/organisms/LoginForm';
import { useLoginForm } from '../hooks/useLoginForm';
import { DismissKeyboardWrapper } from '../utils/dismissKeyboard';

export default function LoginScreen() {
  const { 
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleLogin, 
    isLoading, 
    error,
    isFormFilled,
  } = useLoginForm();

  return (
    <DismissKeyboardWrapper>
      <View className="flex-1 bg-slate-950">
        {/* Background Geral */}
        <GradientBackground variant="alt" />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 justify-center px-8"
        >
          <LoginForm 
            email={email}
            password={password}
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
            onSubmit={handleLogin} 
            isLoading={isLoading} 
            error={error}
            isFormFilled={isFormFilled}
          />
        </KeyboardAvoidingView>
      </View>
    </DismissKeyboardWrapper>
  );
}
