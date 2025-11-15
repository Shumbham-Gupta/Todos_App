import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams, Link } from 'react-router-dom';
import { useResetPassword } from '../hooks/useAuth';

const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const { mutate: resetPassword, isPending, isSuccess, error } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPassword({ token, password: data.password });
  };

  if (!token) {
    return (
      <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', textAlign: 'center' }}>
        <h1>Invalid Reset Link</h1>
        <Link to="/forgot-password" style={{ color: '#007bff' }}>
          Request New Reset Link
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Reset Password</h1>
      
      {isSuccess ? (
        <div style={{ padding: '15px', backgroundColor: '#d4edda', borderRadius: '4px', marginBottom: '20px' }}>
          <p style={{ color: '#155724', margin: 0 }}>
            Password reset successfully! You can now sign in.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>New Password</label>
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

          <div>
            <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
            {errors.confirmPassword && (
              <span style={{ color: 'red', fontSize: '14px' }}>{errors.confirmPassword.message}</span>
            )}
          </div>

          {error && (
            <div style={{ color: 'red', fontSize: '14px' }}>
              {(error as any).response?.data?.error || 'Reset failed'}
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
            {isPending ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}

      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/signin" style={{ color: '#007bff' }}>
          Back to Sign In
        </Link>
      </p>
    </div>
  );
};