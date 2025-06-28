import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon, UserIcon, KeyIcon } from 'lucide-react';
type LoginScreenProps = {
  onLogin: (email: string, password: string) => void;
};
const LoginScreen = ({
  onLogin
}: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin(email, password);
      setIsLoading(false);
    }, 800);
  };
  return <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-headspace-purple to-indigo-900 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-headspace-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserIcon size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your WMS account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon size={18} className="text-gray-400" />
              </div>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:ring-2 focus:ring-headspace-blue focus:border-headspace-blue" placeholder="you@example.com" required />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyIcon size={18} className="text-gray-400" />
              </div>
              <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:ring-2 focus:ring-headspace-blue focus:border-headspace-blue" placeholder="••••••••" required />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOffIcon size={18} className="text-gray-400" /> : <EyeIcon size={18} className="text-gray-400" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" type="checkbox" className="h-4 w-4 text-headspace-orange focus:ring-headspace-orange border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-headspace-blue hover:text-headspace-blue-dark">
                Forgot password?
              </a>
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-headspace-orange hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-headspace-orange transition-colors">
            {isLoading ? <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span> : 'Sign in'}
          </button>
        </form>
      </div>
    </div>;
};
export default LoginScreen;