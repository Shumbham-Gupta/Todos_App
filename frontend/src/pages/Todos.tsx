import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo, useToggleTodo } from '../hooks/useTodos';
import { useAuthStore } from '../store/authStore';
import { Todo } from '../type';

const todoFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

type TodoFormData = z.infer<typeof todoFormSchema>;

export const Todos: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { data, isLoading } = useTodos();
  const { mutate: createTodo } = useCreateTodo();
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: toggleTodo } = useToggleTodo();

  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoFormSchema),
  });

  const {
    register: registerEdit,
    handleSubmit: handleEditSubmit,
    reset: resetEdit,
    setValue,
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoFormSchema),
  });

  const onSubmit = (formData: TodoFormData) => {
    createTodo(formData, {
      onSuccess: () => reset(),
    });
  };

  const handleEdit = (todo: Todo) => {
    setEditingId(todo._id);
    setValue('title', todo.title);
    setValue('description', todo.description || '');
  };

  const onEditSubmit = (formData: TodoFormData) => {
    if (editingId) {
      updateTodo(
        { id: editingId, data: formData },
        {
          onSuccess: () => {
            setEditingId(null);
            resetEdit();
          },
        }
      );
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>My Todos</h1>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: '0 0 10px' }}>Welcome, {user?.name}!</p>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>Add New Todo</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            {...register('title')}
            placeholder="Todo title"
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          {errors.title && <span style={{ color: 'red', fontSize: '14px' }}>{errors.title.message}</span>}

          <textarea
            {...register('description')}
            placeholder="Description (optional)"
            rows={3}
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
          />

          <button
            type="submit"
            style={{
              padding: '10px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Add Todo
          </button>
        </form>
      </div>

      <div>
        <h2>Todo List ({data?.count || 0})</h2>
        {data?.todos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>No todos yet. Create your first one!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {data?.todos.map((todo) => (
              <div
                key={todo._id}
                style={{
                  padding: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                }}
              >
                {editingId === todo._id ? (
                  <form onSubmit={handleEditSubmit(onEditSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                      {...registerEdit('title')}
                      style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <textarea
                      {...registerEdit('description')}
                      rows={2}
                      style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        type="submit"
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#6c757d',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo._id)}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                      />
                      <h3
                        style={{
                          margin: 0,
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          color: todo.completed ? '#999' : '#000',
                        }}
                      >
                        {todo.title}
                      </h3>
                    </div>
                    {todo.description && (
                      <p style={{ margin: '0 0 10px 30px', color: '#666' }}>{todo.description}</p>
                    )}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button
                        onClick={() => handleEdit(todo)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTodo(todo._id)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};