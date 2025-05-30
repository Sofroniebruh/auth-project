import { LoginFormType, RegisterFormType } from '@/components/auth/schema';
import { User } from '@prisma/client';

export async function login(data: LoginFormType) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const receivedResponse = {
    ...(await response.json()) as { message: string, user: User },
    status: response.status,
  };

  if (response.ok) {
    return receivedResponse;
  }

  return new Error(receivedResponse.message);
}

export async function register(data: RegisterFormType) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const receivedResponse = {
    ...(await response.json()) as { message: string, user: User },
    status: response.status,
  };

  if (response.ok) {
    return receivedResponse;
  }

  throw new Error(receivedResponse.message);
}

export async function logout() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/logout`, {
    method: 'POST',
  });

  return response.ok;
}