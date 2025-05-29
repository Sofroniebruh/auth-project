import { NewPostSchemaType } from '@/components/auth/schema';

export interface NewPostData extends NewPostSchemaType {
  imageUrl: string;
}

export const changeUsername = async (username: string, id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/users/user/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username }),
  });

  return res.ok;
};

export async function deleteUser(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/users/user/${id}`, {
    method: 'DELETE',
  });

  return res.ok;
}

export async function changeUserPfp(link: string, id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/users/user/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pfpUrl: link }),
  });

  return res.ok;
}

export async function createUserPost(data: NewPostData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: data.name, description: data.description, imageUrl: data.imageUrl }),
  });

  return res.ok;
}