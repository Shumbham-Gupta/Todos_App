import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { useSignUp } from '../hooks/useAuth';

const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export const SignUp: React.FC = () => {
  const { mutate: signUp, isPending, error } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    signUp(data);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name</label>
          <input
            id="name"
            {...register('name')}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
          {errors.name && (
            <span style={{ color: 'red', fontSize: '14px' }}>{errors.name.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
          {errors.email && (
            <span style={{ color: 'red', fontSize: '14px' }}>{errors.email.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
          {errors.password && (
            <span style={{ color: 'red', fontSize: '14px' }}>{errors.password.message}</span>
          )}
        </div>

        {error && (
          <div style={{ color: 'red', fontSize: '14px' }}>
            {(error as any).response?.data?.error || 'Sign up failed'}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          style={{
            padding: '12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isPending ? 'not-allowed' : 'pointer',
            fontSize: '16px',
          }}
        >
          {isPending ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Already have an account?{' '}
        <Link to="/signin" style={{ color: '#007bff' }}>
          Sign In
        </Link>
      </p>
    </div>
  );
};