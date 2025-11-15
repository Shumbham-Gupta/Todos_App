import { api } from '../lib/api';
import {
  TodoForm,
  TodosResponseSchema,
  TodoResponseSchema,
  Todo,
} from '../type';

export const todoService = {
  getTodos: async () => {
    const response = await api.get('/todos');
    return TodosResponseSchema.parse(response.data);
  },

  createTodo: async (data: TodoForm) => {
    const response = await api.post('/todos', data);
    return TodoResponseSchema.parse(response.data);
  },

  updateTodo: async (id: string, data: Partial<Todo>) => {
    const response = await api.put(`/todos/${id}`, data);
    return TodoResponseSchema.parse(response.data);
  },

  deleteTodo: async (id: string) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },

  toggleTodo: async (id: string) => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return TodoResponseSchema.parse(response.data);
  },
};