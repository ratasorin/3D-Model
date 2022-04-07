import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { ReplaySubject } from 'rxjs';

export const user$ = new ReplaySubject<User | undefined>(1);
export const useUser = () => {
  const user = useSession().data?.user as User | undefined;
  useEffect(() => {
    user$.next(user);
  }, [user]);
};
