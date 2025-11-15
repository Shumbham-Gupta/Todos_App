import { z } from 'zod';

// Zod Schemas
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
});

export const TodoSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
  userId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const AuthResponseSchema = z.object({
  message: z.string(),
  token: z.string(),
  user: UserSchema,
});

export const TodosResponseSchema = z.object({
  todos: z.array(TodoSchema),
  count: z.number(),
});

export const TodoResponseSchema = z.object({
  message: z.string(),
  todo: TodoSchema,
});

// Types
export type User = z.infer<typeof UserSchema>;
export type Todo = z.infer<typeof TodoSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type TodosResponse = z.infer<typeof TodosResponseSchema>;

// Form Types
export interface SignUpForm {
  email: string;
  password: string;
  name: string;
}

export interface SignInForm {
  email: string;
  password: string;
}

export interface ForgotPasswordForm {
  email: string;
}

export interface ResetPasswordForm {
  token: string;
  password: string;
}

export interface TodoForm {
  title: string;
  description?: string;
}