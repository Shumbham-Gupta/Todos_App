import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import {
  SignUpForm,
  SignInForm,
  ForgotPasswordForm,
  ResetPasswordForm,
} from '../type';

export const useSignUp = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (data: SignUpForm) => authService.signup(data),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      navigate('/todos');
    },
  });
};

export const useSignIn = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (data: SignInForm) => authService.signin(data),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      navigate('/todos');
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordForm) => authService.forgotPassword(data),
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ResetPasswordForm) => authService.resetPassword(data),
    onSuccess: () => {
      navigate('/signin');
    },
  });
};