import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Loader2, Eye, EyeOff, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthContainer, AuthCard, BrandHeader, Form, FormGroup, SubmitButton, AuthFooter, Divider, GoogleButton } from './Login';

export default function Register() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleGoogleLogin() {
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      toast.error('Falha ao registrar com Google: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return toast.error('As senhas não coincidem');
    }
    
    try {
      setLoading(true);
      await signup(email, password, displayName.trim());
      toast.success('Conta criada com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Falha ao criar conta: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContainer>
      <AuthCard>
        <BrandHeader>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', width: '100%' }}>
            <img src="/imagelogo.png" alt="Logo" style={{ height: '90px', width: 'auto', objectFit: 'contain' }} />
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', margin: 0 }}>
              Currículo<span style={{ color: '#2563eb' }}>Generator</span>
            </h1>
          </div>
          <p>Crie sua conta gratuitamente</p>
        </BrandHeader>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Nome Completo</label>
            <div className="input-wrapper">
              <User size={18} />
              <input 
                type="text" 
                required 
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="Seu nome completo" 
              />
            </div>
          </FormGroup>

          <FormGroup>
            <label>E-mail</label>
            <div className="input-wrapper">
              <Mail size={18} />
              <input 
                type="email" 
                required 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com" 
              />
            </div>
          </FormGroup>

          <FormGroup>
            <label>Senha</label>
            <div className="input-wrapper">
              <Lock size={18} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                required 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" 
                style={{ paddingRight: '3rem' }}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '1rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </FormGroup>
          
          <FormGroup>
            <label>Confirmar Senha</label>
            <div className="input-wrapper">
              <Lock size={18} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                required 
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
                placeholder="••••••••" 
                style={{ paddingRight: '3rem' }}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '1rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={18} /> : 'Criar Conta'}
          </SubmitButton>
        </Form>

        <Divider>
          <span>ou</span>
        </Divider>

        <GoogleButton type="button" onClick={handleGoogleLogin} disabled={loading}>
          <svg viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Entrar com Google
        </GoogleButton>

        <AuthFooter>
          Já possui conta? <Link to="/login">Faça Login</Link>
        </AuthFooter>
      </AuthCard>
    </AuthContainer>
  );
}
