import { LoginFormType, RegisterFormType } from '@/components/auth/schema';

export async function login(data: LoginFormType) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return response.json();
  }

  return response.status;
}

export async function register(data: RegisterFormType) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  if (!response.ok) {
    return response.json();
  }

  return response.status;
}

export async function logout() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/logout`, {
    method: 'POST',
  });

  return response.ok;
}