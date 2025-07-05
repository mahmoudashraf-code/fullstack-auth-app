import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Icons
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const GraduationCapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-300">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);

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
                <div className={`relative rounded-md shadow-sm ${errors.name ? 'ring-1 ring-red-500' : ''} transition-all duration-200 hover:shadow-md focus-within:shadow-md`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon />
                  </div>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    {...register('name')}
                    className={`!pl-10 block w-full rounded-lg border ${
                      errors.name ? 'border-red-500 text-red-900 placeholder-red-300' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all p-3 sm:p-3 text-base`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className={`relative rounded-md shadow-sm ${errors.email ? 'ring-1 ring-red-500' : ''} transition-all duration-200 hover:shadow-md focus-within:shadow-md`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EmailIcon />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register('email')}
                    className={`!pl-10 block w-full rounded-lg border ${
                      errors.email ? 'border-red-500 text-red-900 placeholder-red-300' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all p-3 sm:p-3 text-base`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className={`relative rounded-md shadow-sm ${errors.password ? 'ring-1 ring-red-500' : ''} transition-all duration-200 hover:shadow-md focus-within:shadow-md`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon />
                  </div>
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    {...register('password')}
                    className={`!pl-10 block w-full rounded-lg border ${
                      errors.password ? 'border-red-500 text-red-900 placeholder-red-300' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all p-3 sm:p-3 text-base`}
                    placeholder="Create a strong password"
                  />
                </div>
                
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

            <div className="flex items-start">
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
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-3 sm:py-3 px-4 border border-transparent text-sm sm:text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150 ease-in-out shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] min-h-[48px]"
              >
                {isSubmitting ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <GraduationCapIcon />
                  </span>
                )}
                {isSubmitting ? "Creating your account..." : "Start Learning Today"}
              </button>
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
              <button
                type="button"
                className="py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center transition-all duration-200 hover:shadow-md transform hover:translate-y-[-2px] min-h-[48px]"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" width="24" height="24">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                  </g>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center transition-all duration-200 hover:shadow-md transform hover:translate-y-[-2px] min-h-[48px]"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 2.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd"/>
                </svg>
                GitHub
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
