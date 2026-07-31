"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Hexagon, Mail, Lock, Eye, EyeOff, Smartphone, ArrowRight, Loader2, 
  ArrowLeft, CheckCircle2, AlertCircle, Phone, RefreshCw, KeyRound, ShieldCheck
} from 'lucide-react';
import { useAuth } from '@/features/authentication/context/AuthContext';
import { authService } from '@/features/authentication/services/AuthenticationService';

type AuthMode = 'signIn' | 'signUp' | 'otp' | 'forgotPassword';

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>('signIn');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // OTP State
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [otpStep, setOtpStep] = useState<1 | 2>(1);
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState<number>(60);
  const [timerActive, setTimerActive] = useState(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStep, setForgotStep] = useState<1 | 2>(1);
  const [forgotCode, setForgotCode] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');

  // UI State
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'github' | null>(null);

  const { login } = useAuth();
  const router = useRouter();

  // Pre-fill remembered email
  useEffect(() => {
    const savedEmail = localStorage.getItem('nnp_remembered_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setForgotEmail(savedEmail);
    }
  }, []);

  // OTP Countdown timer
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { label: '', color: 'bg-transparent', width: '0%', textClass: 'text-gray-400' };
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 1) return { label: 'Weak', color: 'bg-rose-500', width: '33%', textClass: 'text-rose-400' };
    if (score <= 3) return { label: 'Medium', color: 'bg-amber-400', width: '66%', textClass: 'text-amber-300' };
    return { label: 'Strong', color: 'bg-emerald-400', width: '100%', textClass: 'text-emerald-400' };
  };

  const handleModeChange = (newMode: AuthMode) => {
    setErrorMsg('');
    setSuccessMsg('');
    setMode(newMode);
    if (newMode === 'forgotPassword' && email) {
      setForgotEmail(email);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email address and password');
      return;
    }

    setLoading(true);
    try {
      if (rememberMe) {
        localStorage.setItem('nnp_remembered_email', email);
      } else {
        localStorage.removeItem('nnp_remembered_email');
      }

      const response = await authService.login({ email, password });
      login(response.user, response.token);
      setSuccessMsg('Authentication successful! Redirecting to NNP Dashboard...');
      setTimeout(() => router.push('/dashboard'), 800);
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password || !confirmPassword) {
      setErrorMsg('Please complete all registration fields');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.register({ email, password });
      login(response.user, response.token);
      setSuccessMsg('Account created successfully! Logging into NNP Dashboard...');
      setTimeout(() => router.push('/dashboard'), 800);
    } catch (err: any) {
      setErrorMsg(err.message || 'Account creation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!mobileNumber || mobileNumber.length < 8) {
      setErrorMsg('Please enter a valid mobile number');
      return;
    }

    setLoading(true);
    try {
      await authService.sendOtp(`${countryCode} ${mobileNumber}`);
      setOtpStep(2);
      setTimer(60);
      setTimerActive(true);
      setSuccessMsg(`OTP sent successfully to ${countryCode} ${mobileNumber}`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send OTP code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const fullOtp = otpDigits.join('');
    if (fullOtp.length !== 6) {
      setErrorMsg('Please enter the full 6-digit OTP code');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.verifyOtp(`${countryCode} ${mobileNumber}`, fullOtp);
      login(response.user, response.token);
      setSuccessMsg('OTP verified successfully! Redirecting to NNP Dashboard...');
      setTimeout(() => router.push('/dashboard'), 800);
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid or expired OTP code');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (timerActive) return;
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);
    try {
      await authService.sendOtp(`${countryCode} ${mobileNumber}`);
      setTimer(60);
      setTimerActive(true);
      setSuccessMsg(`A new OTP has been sent to ${countryCode} ${mobileNumber}`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpDigitChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = val.slice(-1);
    setOtpDigits(newDigits);

    if (val && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (forgotStep === 1) {
      if (!forgotEmail) {
        setErrorMsg('Please enter your account email address');
        return;
      }
      setLoading(true);
      try {
        await authService.forgotPassword(forgotEmail);
        setForgotStep(2);
        setSuccessMsg(`Password reset code sent to ${forgotEmail}`);
      } catch (err: any) {
        setErrorMsg(err.message || 'Failed to send reset code');
      } finally {
        setLoading(false);
      }
    } else {
      if (!forgotCode || !resetNewPassword) {
        setErrorMsg('Please enter verification code and new password');
        return;
      }
      setLoading(true);
      try {
        await authService.resetPassword(forgotCode, resetNewPassword);
        const response = await authService.login({ email: forgotEmail, password: resetNewPassword });
        login(response.user, response.token);
        setSuccessMsg('Password reset successful! Redirecting to NNP Dashboard...');
        setTimeout(() => router.push('/dashboard'), 800);
      } catch (err: any) {
        setErrorMsg(err.message || 'Failed to reset password');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setErrorMsg('');
    setSuccessMsg('');
    setSocialLoading(provider);

    try {
      const response = provider === 'google' 
        ? await authService.loginWithGoogle() 
        : await authService.loginWithGitHub();

      login(response.user, response.token);
      setSuccessMsg(`Signed in with ${provider === 'google' ? 'Google' : 'GitHub'}! Redirecting...`);
      setTimeout(() => router.push('/dashboard'), 800);
    } catch (err: any) {
      setErrorMsg(`Authentication failed with ${provider}`);
    } finally {
      setSocialLoading(null);
    }
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="relative z-10 w-full max-w-md">
        {/* Official NNP Branding */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center justify-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Hexagon className="w-6 h-6 text-secondary group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-white font-extrabold text-2xl tracking-wider leading-none">NNP</span>
              <span className="text-[10px] text-gray-400 font-normal tracking-wide mt-1">(Network Navigator Pioneers)</span>
            </div>
          </Link>
          <p className="text-gray-400 mt-3 font-light text-sm">Sign in to your NNP Dashboard</p>
        </div>

        {/* Auth Card */}
        <div className="glass-card p-8 rounded-3xl relative overflow-hidden shadow-2xl transition-all duration-300">
          {/* Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-[60px] pointer-events-none" />

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="mb-6 bg-red-500/10 border border-red-500/40 text-red-400 text-xs p-3.5 rounded-xl flex items-center gap-2.5 animate-[fadeIn_0.2s_ease-out]">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs p-3.5 rounded-xl flex items-center gap-2.5 animate-[fadeIn_0.2s_ease-out]">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* 1. SIGN IN MODE */}
          {mode === 'signIn' && (
            <form id="login-form" className="space-y-6 relative z-10" onSubmit={handleSignIn}>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surfaceLight border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-300">Password</label>
                  <button
                    type="button"
                    onClick={() => handleModeChange('forgotPassword')}
                    className="text-xs text-secondary hover:text-white transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="login-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-surfaceLight border border-white/10 rounded-xl pl-11 pr-12 py-3 text-sm text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-transparent text-secondary focus:ring-secondary focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-400 cursor-pointer">
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || socialLoading !== null}
                className="w-full group relative overflow-hidden rounded-xl bg-secondary text-black py-3.5 font-medium transition-all hover:shadow-[0_0_20px_rgba(38,198,218,0.5)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Authenticating...</>
                  ) : (
                    <>Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </span>
              </button>

              {/* OTP Login Toggle */}
              <button
                type="button"
                onClick={() => handleModeChange('otp')}
                className="w-full group relative overflow-hidden rounded-xl bg-transparent border border-secondary text-secondary py-3.5 font-medium transition-all hover:bg-secondary/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Login with OTP <Smartphone className="w-4 h-4" />
                </span>
              </button>
            </form>
          )}

          {/* 2. CREATE ACCOUNT (SIGN UP) MODE */}
          {mode === 'signUp' && (
            <form className="space-y-5 relative z-10" onSubmit={handleSignUp}>
              <div>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-1">New User</span>
                <h3 className="text-xl font-bold text-white mb-4">Create your NNP Account</h3>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surfaceLight border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Create Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-surfaceLight border border-white/10 rounded-xl pl-11 pr-12 py-3 text-sm text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gray-400">Password Strength:</span>
                      <span className={`font-semibold ${strength.textClass}`}>{strength.label}</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full ${strength.color} transition-all duration-300`} style={{ width: strength.width }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-surfaceLight border border-white/10 rounded-xl pl-11 pr-12 py-3 text-sm text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full group relative overflow-hidden rounded-xl bg-secondary text-black py-3.5 font-medium transition-all hover:shadow-[0_0_20px_rgba(38,198,218,0.5)] flex items-center justify-center gap-2 mt-4 disabled:opacity-70 cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Creating Account...</>
                  ) : (
                    <>Create NNP Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => handleModeChange('signIn')}
                  className="text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </button>
              </div>
            </form>
          )}

          {/* 3. LOGIN WITH OTP MODE */}
          {mode === 'otp' && (
            <div className="space-y-6 relative z-10">
              <div>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-1">Mobile Authentication</span>
                <h3 className="text-xl font-bold text-white">Login with OTP</h3>
              </div>

              {otpStep === 1 ? (
                <form onSubmit={handleSendOtp} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Mobile Number</label>
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="bg-surfaceLight border border-white/10 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-secondary transition-all"
                      >
                        <option value="+91">+91 (IN)</option>
                        <option value="+1">+1 (US)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+971">+971 (UAE)</option>
                      </select>
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Phone className="w-4 h-4 text-slate-400" />
                        </div>
                        <input
                          type="tel"
                          placeholder="98765 43210"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          className="w-full bg-surfaceLight border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full group relative overflow-hidden rounded-xl bg-secondary text-black py-3.5 font-medium transition-all hover:shadow-[0_0_20px_rgba(38,198,218,0.5)] flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {loading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Sending OTP...</>
                      ) : (
                        <>Send OTP <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                      )}
                    </span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-5">
                  <div className="text-center">
                    <p className="text-xs text-slate-300 mb-4">
                      Enter the 6-digit verification code sent to <br />
                      <span className="font-bold text-white">{countryCode} {mobileNumber}</span>
                    </p>

                    {/* 6 Digit Inputs */}
                    <div className="flex justify-between gap-2 my-4">
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => { otpInputRefs.current[idx] = el; }}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className="w-11 h-12 text-center bg-surfaceLight border border-white/10 rounded-xl text-lg font-bold text-white focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/50 transition-all"
                        />
                      ))}
                    </div>

                    {/* Timer & Resend */}
                    <div className="flex items-center justify-between text-xs mt-3">
                      <span className="text-slate-400">
                        {timerActive ? `Resend OTP in ${timer}s` : 'Code expired'}
                      </span>
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={timerActive || loading}
                        className="text-secondary hover:text-white font-medium disabled:opacity-40 disabled:hover:text-secondary flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" /> Resend OTP
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full group relative overflow-hidden rounded-xl bg-secondary text-black py-3.5 font-medium transition-all hover:shadow-[0_0_20px_rgba(38,198,218,0.5)] flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {loading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</>
                      ) : (
                        <>Verify OTP & Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                      )}
                    </span>
                  </button>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setOtpStep(1)}
                      className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Change Mobile Number
                    </button>
                  </div>
                </form>
              )}

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => handleModeChange('signIn')}
                  className="text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Email Sign In
                </button>
              </div>
            </div>
          )}

          {/* 4. FORGOT PASSWORD MODE */}
          {mode === 'forgotPassword' && (
            <div className="space-y-6 relative z-10">
              <div>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-1">Account Recovery</span>
                <h3 className="text-xl font-bold text-white">Reset Password</h3>
              </div>

              <form onSubmit={handleForgotPasswordSubmit} className="space-y-5">
                {forgotStep === 1 ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-slate-400" />
                      </div>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="w-full bg-surfaceLight border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                        required
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      Enter your account email and we will send you a verification code to reset your password.
                    </p>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Verification Code</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <KeyRound className="w-5 h-5 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="6-digit reset code"
                          value={forgotCode}
                          onChange={(e) => setForgotCode(e.target.value)}
                          className="w-full bg-surfaceLight border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="w-5 h-5 text-slate-400" />
                        </div>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={resetNewPassword}
                          onChange={(e) => setResetNewPassword(e.target.value)}
                          className="w-full bg-surfaceLight border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group relative overflow-hidden rounded-xl bg-secondary text-black py-3.5 font-medium transition-all hover:shadow-[0_0_20px_rgba(38,198,218,0.5)] flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                    ) : forgotStep === 1 ? (
                      <>Send Verification Code <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                    ) : (
                      <>Reset & Sign In <ShieldCheck className="w-4 h-4" /></>
                    )}
                  </span>
                </button>
              </form>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => handleModeChange('signIn')}
                  className="text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </button>
              </div>
            </div>
          )}

          {/* Social OAuth Login Section (Visible on signIn & signUp) */}
          {(mode === 'signIn' || mode === 'signUp') && (
            <div className="mt-8 relative z-10">
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-white/10" />
                <span className="flex-shrink-0 mx-4 text-xs text-slate-500 uppercase tracking-wider">Or continue with</span>
                <div className="flex-grow border-t border-white/10" />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <button
                  type="button"
                  disabled={socialLoading !== null || loading}
                  onClick={() => handleOAuthLogin('github')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium text-white disabled:opacity-50 cursor-pointer"
                >
                  {socialLoading === 'github' ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )}
                  GitHub
                </button>
                <button
                  type="button"
                  disabled={socialLoading !== null || loading}
                  onClick={() => handleOAuthLogin('google')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium text-white disabled:opacity-50 cursor-pointer"
                >
                  {socialLoading === 'google' ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  )}
                  Google
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="text-center mt-8 space-y-4">
          {mode === 'signIn' ? (
            <p className="text-sm text-gray-400">
              Don&apos;t have an account?{' '}
              <button
                onClick={() => handleModeChange('signUp')}
                className="text-secondary hover:text-white transition-colors font-medium cursor-pointer"
              >
                Create one now
              </button>
            </p>
          ) : (
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => handleModeChange('signIn')}
                className="text-secondary hover:text-white transition-colors font-medium cursor-pointer"
              >
                Sign In now
              </button>
            </p>
          )}
          
          <div>
            <button 
              onClick={() => router.push('/business-partner')}
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
