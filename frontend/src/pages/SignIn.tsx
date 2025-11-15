import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { useSignIn } from '../hooks/useAuth';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export const SignIn: React.FC = () => {
  const { mutate: signIn, isPending, error } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInFormData) => {
    signIn(data);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
            {(error as any).response?.data?.error || 'Sign in failed'}
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
          {isPending ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/forgot-password" style={{ color: '#007bff', marginRight: '15px' }}>
          Forgot Password?
        </Link>
        <span>|</span>
        <Link to="/signup" style={{ color: '#007bff', marginLeft: '15px' }}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};