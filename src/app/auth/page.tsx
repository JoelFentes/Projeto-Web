'use client';

import CustomTextField from '@/components/CustomTextField';
import {
  Box,
  Button,
  Typography,
  Link,
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext'; // <-- IMPORTANTE

export default function AuthPage() {
  const router = useRouter();
  const { setUser } = useAuth(); // <-- PEGANDO O SETUSER DO CONTEXTO

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';

    const body = isSignup
      ? { name, email, password }
      : { email, password };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || 'Erro');
      return;
    }

    // Salva token e usuário
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);

    router.push('/');
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: 'secondary.main',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '27.5%',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          bgcolor: 'background.default',
          color: 'text.secondary',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography align="center" fontFamily="Poppins" variant="h6" color="text.primary" fontSize="22px">
          Bem-vindo ao DevPortfolio!
        </Typography>

        <Typography align="center" variant="subtitle2" color="text.primary" fontWeight="light">
          {isSignup ? 'Preencha os dados para se cadastrar.' : 'Faça login para continuar.'}
        </Typography>

        {isSignup && (
          <CustomTextField
            id="name"
            label="Nome"
            type="text"
            autoComplete="name"
            required
            fullWidth
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
        )}

        <CustomTextField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          fullWidth
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <CustomTextField
          id="password"
          label="Senha"
          type="password"
          autoComplete="current-password"
          required
          fullWidth
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />
        {isSignup && (
          <CustomTextField
            id="confirmPassword"
            label="Confirmar Senha"
            type="password"
            required
            fullWidth
            value={confirmPassword}
            onChange={(e: any) => setConfirmPassword(e.target.value)}
          />
        )}

        <Link
          component="button"
          onClick={() => setIsSignup(!isSignup)}
          underline="none"
          sx={{
            textAlign: 'center',
            color: 'text.primary',
            fontWeight: 'light',
            fontSize: '14px',
            mt: 1,
          }}
        >
          {isSignup ? 'Já tem uma conta? Faça login.' : 'Ainda não tem uma conta? Crie uma!'}
        </Link>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            bgcolor: 'text.primary',
            color: 'background.default',
            fontWeight: 'light',
            fontSize: '16px',
            '&:hover': { bgcolor: 'secondary.main' },
          }}
        >
          {isSignup ? 'Cadastrar' : 'Entrar'}
        </Button>
      </Box>
    </Box>
  );
}
