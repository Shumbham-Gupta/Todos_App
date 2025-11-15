import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { useForgotPassword } from '../hooks/useAuth';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPassword: React.FC = () => {
  const { mutate: forgotPassword, isPending, isSuccess, error, data } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (formData: ForgotPasswordFormData) => {
    forgotPassword(formData);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Forgot Password</h1>
      
      {isSuccess ? (
        <div style={{ padding: '15px', backgroundColor: '#d4edda', borderRadius: '4px', marginBottom: '20px' }}>
          <p style={{ color: '#155724', margin: 0 }}>
            Password reset instructions sent! Check your email.
          </p>
          {data?.resetToken && (
            <p style={{ color: '#155724', marginTop: '10px', fontSize: '12px' }}>
              <strong>Development Token:</strong> {data.resetToken}
            </p>
          )}
        </div>
      ) : (
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

          {error && (
            <div style={{ color: 'red', fontSize: '14px' }}>
              {(error as any).response?.data?.error || 'Request failed'}
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
            {isPending ? 'Sending...' : 'Send Reset Link'}
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