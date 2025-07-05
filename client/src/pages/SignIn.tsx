import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FormInput, Button, EmailIcon, LockIcon, ErrorIcon, BookIcon, CertificateIcon, GoogleIcon, GitHubIcon } from '../components/ui';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await signIn(data);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left panel - Decorative/branding side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 p-6 xl:p-12 text-white flex-col justify-between">
        <div>
          <h1 className="text-3xl xl:text-4xl font-bold mb-2">Welcome to EduLearn!</h1>
          <p className="text-blue-100 text-lg xl:text-xl">Continue your learning journey with us.</p>
        </div>
        
        <div className="space-y-6 xl:space-y-8">
          {/* Testimonial or feature highlight */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 xl:p-6 shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
            <p className="italic text-blue-100 mb-4 text-sm xl:text-base">
              "This e-learning platform has transformed how I study. The interactive courses and progress tracking keep me motivated!"
            </p>
            <div className="flex items-center">
              <div className="h-8 w-8 xl:h-10 xl:w-10 rounded-full bg-blue-300 flex items-center justify-center text-blue-800 font-bold text-sm xl:text-base">AS</div>
              <div className="ml-3">
                <p className="font-medium text-sm xl:text-base">Alex Smith</p>
                <p className="text-xs xl:text-sm text-blue-200">Computer Science Student</p>
              </div>
            </div>
          </div>
          
          {/* App features */}
          <div className="grid grid-cols-2 gap-3 xl:gap-4">
            <div className="flex items-start space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200">
              <BookIcon />
              <p className="text-sm">Interactive Courses</p>
            </div>
            <div className="flex items-start space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <p className="text-sm">Progress Tracking</p>
            </div>
            <div className="flex items-start space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              <p className="text-sm">Live Classes</p>
            </div>
            <div className="flex items-start space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200">
              <CertificateIcon />
              <p className="text-sm">Certificates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - Sign in form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-12 min-h-screen lg:min-h-0">
        <div className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              New student?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Create your account now
              </Link>
            </p>
          </div>

          {/* Mobile banner for branding */}
          <div className="lg:hidden bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-4 text-white text-center">
            <h3 className="font-bold text-lg">Welcome to EduLearn!</h3>
            <p className="text-blue-100 text-sm mt-1">Your learning journey continues here</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start animate-fade-in">
              <div className="flex-shrink-0 mt-0.5">
                <ErrorIcon />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form className="mt-6 sm:mt-8 space-y-5 sm:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 sm:space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Student email
                </label>
                <FormInput
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  error={errors.email?.message}
                  icon={<EmailIcon />}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
              </div>

              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
                    Forgot password?
                  </a>
                </div>
                <FormInput
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register('password')}
                  error={errors.password?.message}
                  icon={<LockIcon />}
                />
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                loading={isSubmitting}
                loadingText="Signing in..."
                icon={
                  <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                }
                className="w-full"
              >
                Sign in
              </Button>
            </div>

            <div className="relative mt-6 sm:mt-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 sm:mt-6">
              <Button
                variant="outline"
                className="w-full"
              >
                <GoogleIcon className="h-5 w-5 mr-2" />
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
              >
                <GitHubIcon className="h-5 w-5 mr-2" />
                GitHub
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
