import { api } from '../lib/api';
import {
  SignUpForm,
  SignInForm,
  ForgotPasswordForm,
  ResetPasswordForm,
  AuthResponseSchema,
} from '../type';

export const authService = {
  signup: async (data: SignUpForm) => {
    const response = await api.post('/auth/signup', data);
    return AuthResponseSchema.parse(response.data);
  },

  signin: async (data: SignInForm) => {
    const response = await api.post('/auth/signin', data);
    return AuthResponseSchema.parse(response.data);
  },

  forgotPassword: async (data: ForgotPasswordForm) => {
    const response = await api.post('/auth/forgot-password', data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordForm) => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },
};