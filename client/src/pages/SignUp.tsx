import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FormInput, Button, UserIcon, EmailIcon, LockIcon, ErrorIcon, CheckIcon, GraduationCapIcon, GoogleIcon, GitHubIcon } from '../components/ui';

const signUpSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Za-z]/, 'Password must contain at least one letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const password = watch('password', '');

  const getPasswordRequirements = () => {
    return [
      { text: 'At least 8 characters', met: password.length >= 8 },
      { text: 'Contains a letter', met: /[A-Za-z]/.test(password) },
      { text: 'Contains a number', met: /[0-9]/.test(password) },
      { text: 'Contains a special character', met: /[^A-Za-z0-9]/.test(password) },
    ];
  };

  const onSubmit = async (data: SignUpFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await signUp(data);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left panel - Educational branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-800 p-6 xl:p-12 text-white flex-col justify-between">
        <div>
          <h1 className="text-3xl xl:text-4xl font-bold mb-2">Start Your Learning Journey!</h1>
          <p className="text-indigo-100 text-lg xl:text-xl">Join thousands of students transforming their careers through education.</p>
        </div>
        
        <div className="space-y-6 xl:space-y-8">
          {/* Statistics */}
          <div className="grid grid-cols-3 gap-3 xl:gap-4 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 xl:p-4">
              <div className="text-xl xl:text-2xl font-bold">50k+</div>
              <div className="text-xs xl:text-sm text-indigo-200">Active Students</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 xl:p-4">
              <div className="text-xl xl:text-2xl font-bold">500+</div>
              <div className="text-xs xl:text-sm text-indigo-200">Courses</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 xl:p-4">
              <div className="text-xl xl:text-2xl font-bold">95%</div>
              <div className="text-xs xl:text-sm text-indigo-200">Success Rate</div>
            </div>
          </div>
          
          {/* Features */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 xl:p-6 shadow-lg border border-white/20">
            <h3 className="text-lg xl:text-xl font-bold mb-3 xl:mb-4 flex items-center">
              <GraduationCapIcon />
              <span className="ml-2">What You'll Get</span>
            </h3>
            <div className="space-y-2 xl:space-y-3">
              <div className="flex items-center space-x-3">
                <CheckIcon />
                <span className="text-indigo-100 text-sm xl:text-base">Lifetime access to all courses</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckIcon />
                <span className="text-indigo-100 text-sm xl:text-base">Expert instructor support</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckIcon />
                <span className="text-indigo-100 text-sm xl:text-base">Industry-recognized certificates</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckIcon />
                <span className="text-indigo-100 text-sm xl:text-base">Career guidance and mentorship</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - Sign up form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-12 min-h-screen lg:min-h-0">
        <div className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>

          {/* Mobile banner for branding */}
          <div className="lg:hidden bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 text-white text-center">
            <h3 className="font-bold text-lg">Join 50k+ Students!</h3>
            <p className="text-indigo-100 text-sm mt-1">Start your learning journey today</p>
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <FormInput
                  id="name"
                  type="text"
                  autoComplete="name"
                  {...register('name')}
                  error={errors.name?.message}
                  icon={<UserIcon />}
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <FormInput
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  {...register('password')}
                  error={errors.password?.message}
                  icon={<LockIcon />}
                  placeholder="Create a strong password"
                />
                
                {/* Password requirements */}
                {password && (
                  <div className="mt-3 bg-gray-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {getPasswordRequirements().map((req, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          {req.met ? (
                            <CheckIcon />
                          ) : (
                            <div className="w-4 h-4 border border-gray-300 rounded-full"></div>
                          )}
                          <span className={`text-xs ${req.met ? 'text-green-600' : 'text-gray-500'}`}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-0.5 flex-shrink-0"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 leading-5">
                I agree to the{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div>
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                disabled={isSubmitting}
                loading={isSubmitting}
                loadingText="Creating your account..."
                icon={<GraduationCapIcon />}
                className="w-full"
              >
                Start Learning Today
              </Button>
            </div>

            <div className="relative mt-6 sm:mt-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 sm:mt-6">
              <Button
                variant="outline"
                size="md"
                className="w-full"
              >
                <GoogleIcon className="h-5 w-5 mr-2" />
                Google
              </Button>
              <Button
                variant="outline"
                size="md"
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
