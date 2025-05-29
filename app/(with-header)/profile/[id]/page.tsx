import { ProfileComponent } from '@/components/profile-related';
import { Params, UserWithNoPassword } from '@/lib/helpers/helper-types-or-interfaces';
import { cookies } from 'next/headers';
import { API } from '@/lib/api-client/api';

export type ServerUserType = {
  user: UserWithNoPassword,
  isOwner: boolean
}

// @ts-ignore
export default async function ProfilePage({ params }: Promise<Params>) {
  const { id } = await params;
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt')?.value;

  const user: ServerUserType = await API.getUserInfo.getUserInfo(id, token);

  return (
    <ProfileComponent user={user}></ProfileComponent>
  );
}