'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!username || !password) { 
            setError('All fields are required'); 
            return; 
        }
        setLoading(true);
        try {
            await login(username, password);
            router.push('/analyze');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-primary)',
            padding: '20px',
        }}>
            <div style={{
                width: '100%',
                maxWidth: '420px',
                background: 'var(--bg-white)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-xl)',
                padding: '40px',
            }}>
                {/* Logo and Branding */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    marginBottom: '32px',
                }}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 2C13.2 2 11 4.2 11 7v4H9c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V13c0-1.1-.9-2-2-2h-2V7c0-2.8-2.2-5-5-5zm0 2c1.7 0 3 1.3 3 3v4h-6V7c0-1.7 1.3-3 3-3z" fill="#1D4ED8"/>
                        <circle cx="21" cy="21" r="8" fill="#3B82F6"/>
                        <path d="M21 17v5m0 2h.01" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '24px',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                    }}>
                        JobCheck
                    </span>
                </div>

                {/* Heading */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '28px',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        marginBottom: '8px',
                    }}>
                        Welcome back
                    </h1>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '15px',
                        color: 'var(--text-muted)',
                    }}>
                        Sign in to your account
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        padding: '12px 16px',
                        background: 'var(--danger-light)',
                        color: 'var(--danger)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '14px',
                        marginBottom: '24px',
                        fontFamily: 'var(--font-body)',
                    }}>
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Username Field */}
                    <div>
                        <label style={{
                            display: 'block',
                            fontFamily: 'var(--font-body)',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: 'var(--text-secondary)',
                            marginBottom: '8px',
                        }}>
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="input-field"
                            autoComplete="username"
                            style={{
                                outline: 'none',
                            }}
                            onFocus={(e) => {
                                e.target.style.outline = '2px solid var(--primary-light)';
                                e.target.style.outlineOffset = '0px';
                            }}
                            onBlur={(e) => {
                                e.target.style.outline = 'none';
                            }}
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label style={{
                            display: 'block',
                            fontFamily: 'var(--font-body)',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: 'var(--text-secondary)',
                            marginBottom: '8px',
                        }}>
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="input-field"
                                autoComplete="current-password"
                                style={{
                                    outline: 'none',
                                    paddingRight: '44px',
                                }}
                                onFocus={(e) => {
                                    e.target.style.outline = '2px solid var(--primary-light)';
                                    e.target.style.outlineOffset = '0px';
                                }}
                                onBlur={(e) => {
                                    e.target.style.outline = 'none';
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    outline: 'none',
                                }}
                                onFocus={(e) => {
                                    e.target.style.outline = '2px solid var(--primary-light)';
                                    e.target.style.borderRadius = 'var(--radius-sm)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.outline = 'none';
                                }}
                            >
                                {showPassword ? <HiEyeSlash size={20} /> : <HiEye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                        style={{
                            width: '100%',
                            marginTop: '8px',
                            outline: 'none',
                        }}
                        onFocus={(e) => {
                            if (!loading) {
                                e.target.style.outline = '2px solid var(--primary-light)';
                                e.target.style.outlineOffset = '2px';
                            }
                        }}
                        onBlur={(e) => {
                            e.target.style.outline = 'none';
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                {/* Footer */}
                <div style={{
                    marginTop: '32px',
                    textAlign: 'center',
                }}>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                    }}>
                        Don't have an account?{' '}
                        <Link 
                            href="/register" 
                            style={{
                                color: 'var(--primary)',
                                textDecoration: 'none',
                                fontWeight: '600',
                                outline: 'none',
                            }}
                            onFocus={(e) => {
                                e.target.style.outline = '2px solid var(--primary-light)';
                                e.target.style.borderRadius = 'var(--radius-sm)';
                            }}
                            onBlur={(e) => {
                                e.target.style.outline = 'none';
                            }}
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
